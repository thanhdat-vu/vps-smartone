import { colors } from "./colors";

export const gx = {
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundGray: {
    backgroundColor: colors.gray,
    borderRadius: 8,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  regular: {
    fontFamily: "regular",
    colors: colors.text,
    fontSize: 12,
  },
  light: {
    fontFamily: "light",
    colors: colors.text,
    fontSize: 12,
  },
  medium: {
    fontFamily: "medium",
    colors: colors.text,
    fontSize: 12,
  },
  textIcon: { flexDirection: "row", alignItems: "center", gap: 4 },
  number: {
    fontFamily: "semibold",
    fontSize: 14,
    colors: colors.black,
  },
};
