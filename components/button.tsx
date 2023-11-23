import { Button as DefaultButton } from "react-native";
import { COLOR_SKY_500 } from "../utils";

interface Props {
    color: "sky";
}

export type ButtonProps = Props & DefaultButton["props"];

export function Button(props: ButtonProps) {
    const { color, ...otherProps } = props;

    if (color === "sky") return <DefaultButton color={COLOR_SKY_500} {...otherProps} />;

    throw Error("missing color prop");
}
