import { StyleSheet, Text as DefaultText } from "react-native";
import { COLOR_NEUTRAL_200, COLOR_NEUTRAL_300, COLOR_NEUTRAL_400, COLOR_NEUTRAL_500, PADDING } from "../utils";

interface Props {
    type: "sm" | "normal" | "lg" | "xl";
    alignment: "left" | "center" | "right";
}

export type TextProps = Props & DefaultText["props"];

export function Text(props: TextProps) {
    const { style, type, alignment, ...otherProps } = props;

    let typeStyle: any;
    let alignmentStyle: any;

    if (type === "sm") typeStyle = styles.typeSm;
    else if (type === "normal") typeStyle = styles.typeNormal;
    else if (type === "lg") typeStyle = styles.typeLg;
    else if (type === "xl") typeStyle = styles.typeXl;

    if (alignment === "left") alignmentStyle = styles.alignmentLeft;
    if (alignment === "center") alignmentStyle = styles.alignmentCenter;
    if (alignment === "right") alignmentStyle = styles.alignmentRight;

    return <DefaultText style={[typeStyle, alignmentStyle, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
    typeSm: {
        fontSize: 12,
        color: COLOR_NEUTRAL_500,
        fontWeight: "500",
    },
    typeNormal: {
        fontSize: 14,
        color: COLOR_NEUTRAL_400,
        fontWeight: "500",
    },
    typeLg: {
        fontSize: 16,
        color: COLOR_NEUTRAL_300,
        fontWeight: "700",
    },
    typeXl: {
        fontSize: 18,
        color: COLOR_NEUTRAL_200,
        fontWeight: "700",
    },
    alignmentLeft: {
        textAlign: "left",
    },
    alignmentCenter: {
        textAlign: "center",
    },
    alignmentRight: {
        textAlign: "right",
    },
});
