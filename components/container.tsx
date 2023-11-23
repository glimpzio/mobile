import { StyleSheet, View } from "react-native";
import { PADDING } from "../utils";

interface Props {
    direction: "vertical-start" | "vertical-center" | "horizontal-start" | "horizontal-center" | "none";
    pad?: boolean;
}

export type ContainerProps = Props & View["props"];

export function Container(props: ContainerProps) {
    const { style, direction, pad = false, ...otherProps } = props;

    let directionStyle: any;
    let padStyle: any = {};

    if (direction === "vertical-start") directionStyle = styles.directionVerticalStart;
    else if (direction === "vertical-center") directionStyle = styles.directionVerticalCenter;
    else if (direction === "horizontal-start") directionStyle = styles.directionHorizontalStart;
    else if (direction === "horizontal-center") directionStyle = styles.directionHorizontalCenter;
    else if (direction === "none") directionStyle = styles.directionNone;

    if (pad) padStyle = styles.pad;

    return <View style={[directionStyle, padStyle, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
    pad: {
        padding: PADDING,
    },
    directionVerticalStart: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "flex-start",
    },
    directionVerticalCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    directionHorizontalStart: {
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "flex-start",
    },
    directionHorizontalCenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    directionNone: {
        margin: PADDING,
    },
});
