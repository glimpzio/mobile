import { StyleSheet, FlatList as FlatListDefault } from "react-native";
import { PADDING } from "../utils";

interface Props {}

export type FlatListProps = Props & FlatListDefault["props"];

export function FlatList(props: FlatListProps) {
    const { contentContainerStyle, ...otherProps } = props;

    return <FlatListDefault contentContainerStyle={[styles.base, contentContainerStyle]} {...otherProps} />;
}

const styles = StyleSheet.create({
    base: {
        padding: PADDING,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
    },
});
