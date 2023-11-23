import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const KEY_PREFIX = "KEY_CACHE:";
const EXPIRES_IN = 2 * 60 * 60 * 1000;

interface CacheData {
    value: string;
    expiresAt: number;
}

export function useCache(key: string) {
    const cacheKey = KEY_PREFIX + key;

    const [value, setValue] = useState<CacheData | null | undefined>(undefined);

    useEffect(() => {
        if (Platform.OS === "web") {
            const data = localStorage.getItem(cacheKey);
            if (data) {
                const parsed: CacheData = JSON.parse(data);

                if (Date.now() <= parsed.expiresAt) setValue(parsed);
                else setValue(null);
            } else setValue(null);
        } else {
            SecureStore.getItemAsync(cacheKey).then((data) => {
                if (data) {
                    const parsed: CacheData = JSON.parse(data);

                    if (Date.now() <= parsed.expiresAt) setValue(parsed);
                    else setValue(null);
                } else setValue(null);
            });
        }
    }, [setValue]);

    return {
        setValue: (value: string) => {
            const data: CacheData = { value, expiresAt: Date.now() + EXPIRES_IN };

            setValue(data);

            const dataString = JSON.stringify(data);

            if (Platform.OS === "web") localStorage.setItem(cacheKey, dataString);
            else SecureStore.setItemAsync(cacheKey, dataString);
        },
        value: value === null ? null : value?.value,
    };
}
