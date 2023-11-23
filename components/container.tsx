import { ScrollView, StyleSheet, View } from "react-native";
import { PADDING_FULL, PADDING_HALF } from "../utils";

interface Props {
    direction: "vertical-start" | "vertical-center" | "vertical-end" | "horizontal-center" | "none";
    scroll?: boolean;
    expand?: boolean;
    pad?: boolean;
}

export type ContainerProps = Props & View["props"];

export function Container(props: ContainerProps) {
    const { style, direction, pad = false, expand = false, scroll = false, ...otherProps } = props;

    let directionStyle: any;
    let padStyle: any;
    let expandStyle: any;

    if (direction === "vertical-start") directionStyle = styles.directionVerticalStart;
    else if (direction === "vertical-center") directionStyle = styles.directionVerticalCenter;
    else if (direction === "vertical-end") directionStyle = styles.directionVerticalEnd;
    else if (direction === "horizontal-center") directionStyle = styles.directionHorizontalCenter;
    else if (direction === "none") directionStyle = styles.directionNone;

    if (pad) padStyle = styles.padYes;
    else padStyle = styles.padNo;

    if (expand) expandStyle = styles.expandYes;
    else expandStyle = styles.expandNo;

    if (scroll) return <ScrollView contentContainerStyle={[directionStyle, padStyle, expandStyle, style]} {...otherProps} />;
    return <View style={[directionStyle, padStyle, expandStyle, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
    padNo: {},
    padYes: {
        padding: PADDING_FULL,
    },
    expandNo: {},
    expandYes: {
        flexGrow: 1,
    },
    directionVerticalStart: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
    },
    directionVerticalCenter: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
    },
    directionVerticalEnd: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-end",
    },
    directionHorizontalCenter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
    },
    directionNone: {
        margin: PADDING_HALF,
    },
});
