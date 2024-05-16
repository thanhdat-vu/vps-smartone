import { formatNumber } from "../utils/numbers";
import { TextInput, Text } from "react-native";

export default function Editable({
  value,
  setValue,
  textStyle,
  isEdit,
  withSign = false,
  isText = false,
}) {
  return (
    <>
      {isEdit ? (
        <TextInput
          value={value}
          onChangeText={setValue}
          style={{
            backgroundColor: "white",
            fontSize: textStyle.fontSize,
            height: textStyle.lineHeight,
            borderColor: "black",
            borderWidth: 1,
            minWidth: 40,
            textAlign: "center",
          }}
        />
      ) : (
        <Text style={textStyle}>
          {isText ? value : formatNumber(value, withSign)}
        </Text>
      )}
    </>
  );
}
