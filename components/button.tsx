import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { COLOR_SKY_500, COLOR_SKY_600, COLOR_WHITE } from "../utils";

interface Props {
    title: string;
    color: "sky";
}

export type ButtonProps = Props & PressableProps;

export function Button(props: ButtonProps) {
    const { style, title, color, ...otherProps } = props;

    let colorStyle: any;
    let colorPressedStyle: any;

    if (color === "sky") {
        colorStyle = styles.colorSky;
        colorPressedStyle = styles.colorPressedSky;
    }

    return (
        <Pressable style={({ pressed }) => [styles.base, styles.textBase, colorStyle, pressed && colorPressedStyle, style]} {...otherProps}>
            <Text style={styles.textBase}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
    },
    textBase: {
        color: COLOR_WHITE,
        fontSize: 16,
        fontWeight: "500",
    },
    colorSky: {
        backgroundColor: COLOR_SKY_500,
    },
    colorPressedSky: {
        backgroundColor: COLOR_SKY_600,
    },
});
