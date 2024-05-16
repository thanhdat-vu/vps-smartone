import { Header, Icon, Text, Badge, Button, ListItem } from "@rneui/base";
import { Pressable, View } from "react-native";
import { colors } from "../theme/colors";
import { gx } from "../theme/global-styles";
import { useState, useMemo } from "react";
import { formatNumber } from "../utils/numbers";
import { Iconify } from "react-native-iconify";
import { LinearGradient } from "expo-linear-gradient";
import Editable from "../components/Editable";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export default function StocksScreen({ navigation }) {
  const emptyStock = {
    code: "?",
    orderPrice: 0,
    marketPrice: 0,
    vol: 0,
    value: 0,
    marketValue: 0,
    totalVol: 0,
    normalVol: 0,
    fsVol: 0,
    availAmount: 0,
    outroom: 0,
    others: 0,
    dividend: 0,
    t0Vol: 0,
    t1Vol: 0,
    t2Vol: 0,
  };

  const [id, setId] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [data, setData] = useState({
    account: "N",
    netAssetVal: 50000000,
    availCollatera: 10000000,
    stocks: [emptyStock, emptyStock, emptyStock, emptyStock],
  });
  const [checked, setChecked] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const snapPoints = useMemo(() => ["50%", "100%"], []);

  const investedValue = useMemo(
    () => data.stocks.reduce((acc, it) => acc + Number(it.value), 0),
    [data.stocks]
  );
  const marketValue = useMemo(
    () => data.stocks.reduce((acc, it) => acc + Number(it.marketValue), 0),
    [data.stocks]
  );
  const changeRate = useMemo(
    () => (((marketValue - investedValue) / investedValue) * 100).toFixed(2),
    [investedValue, marketValue]
  );

  return (
    <View style={{ flex: 1 }}>
      <Header
        backgroundColor="transparent"
        containerStyle={{
          borderBottomColor: "transparent",
        }}
        centerContainerStyle={{
          justifyContent: "center",
        }}
        leftContainerStyle={{
          justifyContent: "center",
        }}
        rightContainerStyle={{
          justifyContent: "center",
        }}
        centerComponent={
          <Pressable
            onPress={() => {
              setIsEdit(!isEdit);
            }}
          >
            <Text
              style={{
                fontFamily: "semibold",
                fontSize: 18,
                color: colors.text,
              }}
            >
              Cổ phiếu
            </Text>
          </Pressable>
        }
        leftComponent={<Icon name="chevron-left" type="feather" />}
        rightComponent={
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Iconify icon="ion:search" size={20} color={colors.text} />
            <Iconify icon="ci:menu-alt-01" size={28} color={colors.text} />
          </View>
        }
      />

      {/* Tab */}
      <View
        style={{
          ...gx.row,
        }}
      >
        {[
          {
            id: 0,
            index: "N46772",
            no: 1,
          },
          {
            id: 1,
            index: "N46772",
            no: 3,
          },
          {
            id: 2,
            index: "N46772",
            no: 6,
          },
        ].map((it, i) => (
          <Pressable
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              gap: 2,
              paddingVertical: 8,
              borderBottomWidth: 2,
              borderBottomColor:
                id == it.id ? colors.boldRed : colors.mediumGray,
              alignItems: "center",
            }}
            key={i}
            onPress={() => setId(it.id)}
          >
            <Text
              style={[
                gx.medium,
                {
                  color: id == it.id ? colors.text : colors.boldGray,
                },
              ]}
            >
              {it.index}
            </Text>
            <Badge
              value={it.no}
              badgeStyle={{
                width: 22,
                height: 22,
                borderRadius: 100,
                backgroundColor: id == it.id ? colors.boldRed : colors.boldGray,
                paddingBottom: 4,
              }}
              containerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
              textStyle={[gx.regular, { color: "white", fontSize: 12 }]}
            />
          </Pressable>
        ))}
      </View>

      <View style={{ flex: 1, backgroundColor: colors.gray, gap: 12 }}>
        {/* Non-scrollable */}
        <View
          style={{
            padding: 12,
            gap: 12,
            backgroundColor: "white",
          }}
        >
          {/* Summary */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: colors.lightGreen,
              borderRadius: 16,
              padding: 16,
              overflow: "hidden",
            }}
          >
            <LinearGradient
              colors={[colors.linear1, "transparent"]}
              style={{
                position: "absolute",
                left: -30,
                top: -30,
                height: 120,
                width: 120,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            >
              <View
                style={{
                  backgroundColor: colors.lightGreen,
                  height: "60%",
                  width: "60%",
                  borderRadius: 100,
                }}
              />
            </LinearGradient>

            <LinearGradient
              colors={[colors.linear2, "transparent"]}
              style={{
                position: "absolute",
                right: -30,
                bottom: -60,
                height: 120,
                width: 120,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
              start={{ x: 1, y: 1 }}
              end={{ x: 1, y: 0 }}
            >
              <View
                style={{
                  backgroundColor: colors.lightGreen,
                  height: "60%",
                  width: "60%",
                  borderRadius: 100,
                }}
              />
            </LinearGradient>

            <View style={{ justifyContent: "space-between" }}>
              <View>
                <View
                  style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
                >
                  <Text style={[gx.light]}>Tài sản ròng</Text>
                  <Icon
                    name={hidden ? "eye" : "eye-off"}
                    type="feather"
                    size={16}
                    color={colors.boldGray}
                    onPress={() => setHidden(!hidden)}
                  />
                </View>
                <Editable
                  value={data.netAssetVal}
                  setValue={(value) => {
                    setData({ ...data, netAssetVal: value });
                  }}
                  textStyle={{
                    fontSize: 16,
                    fontFamily: "semibold",
                    color: hidden ? "transparent" : "black",
                    lineHeight: 24,
                  }}
                  isEdit={isEdit}
                />
              </View>
              <View>
                <Text style={[gx.light]}>Sức mua</Text>
                <Editable
                  value={data.availCollatera}
                  setValue={(value) => {
                    setData({ ...data, availCollatera: value });
                  }}
                  textStyle={{
                    fontSize: 16,
                    fontFamily: "semibold",
                    color: hidden ? "transparent" : "black",
                    lineHeight: 24,
                  }}
                  isEdit={isEdit}
                />
              </View>
            </View>

            <View
              style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={[
                    gx.medium,
                    {
                      color: colors.blue,
                    },
                  ]}
                >
                  Chi tiết
                </Text>
                <Icon
                  name="chevron-right"
                  type="feather"
                  size={20}
                  color={colors.blue}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  marginTop: 8,
                }}
              >
                <Text style={[gx.light]}>Trạng thái</Text>
                <Iconify
                  icon="octicon:info-16"
                  type="ionicon"
                  size={16}
                  color={colors.boldGray}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: -4,
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.green,
                    fontFamily: "semibold",
                    fontSize: 14,
                    lineHeight: 18,
                  }}
                >
                  100.00% - An toàn
                </Text>
                <Icon
                  name="chevron-right"
                  type="feather"
                  size={20}
                  color={colors.green}
                />
              </View>
            </View>
          </View>

          {/* Buttons */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: 80, alignItems: "center", gap: 4 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 100,
                  backgroundColor: colors.iconGray,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Iconify
                  icon="solar:dollar-minimalistic-outline"
                  size={24}
                  color={colors.text}
                />
              </View>
              <Text style={[gx.regular, { color: colors.iconText }]}>
                Nạp tiền
              </Text>
            </View>
            {[
              {
                icon: "link",
                title: "Liên kết tài sản",
                link: "ORDER_BOOK",
              },
              {
                icon: "book",
                title: "Sổ lệnh",
                link: "ORDER_BOOK",
              },
              {
                icon: "settings",
                title: "Cài đặt",
                link: "ORDER_BOOK",
              },
            ].map((it, i) => (
              <Pressable
                style={{ alignItems: "center", gap: 4 }}
                key={i}
                onPress={() => navigation.navigate(it.link)}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 100,
                    backgroundColor: colors.iconGray,
                    justifyContent: "center",
                  }}
                >
                  <Icon name={it.icon} type="feather" size={20} />
                </View>
                <Text
                  style={[
                    gx.regular,
                    { color: colors.iconText, width: 60, textAlign: "center" },
                  ]}
                >
                  {it.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Scrollable */}
        <BottomSheet
          snapPoints={snapPoints}
          handleIndicatorStyle={{
            backgroundColor: colors.handle,
            width: 50,
            height: 6,
          }}
          handleStyle={{
            paddingTop: 16,
            paddingBottom: 8,
          }}
          style={{
            backgroundColor: "white",
          }}
          enableOverDrag={false}
        >
          <BottomSheetScrollView
            style={{
              backgroundColor: "red",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingHorizontal: 16,
                paddingBottom: 80,
                gap: 12,
              }}
            >
              <Text style={[gx.medium, { fontSize: 16 }]}>
                Danh mục nắm giữ
              </Text>

              {/* Calculations */}
              <View
                style={{
                  backgroundColor: colors.gray,
                  padding: 12,
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomColor: "grey",
                    borderBottomWidth: 1,
                    borderStyle: "dashed",
                    paddingBottom: 8,
                    marginBottom: 8,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      alignSelf: "flex-start",
                      gap: 4,
                    }}
                  >
                    <Text style={[gx.light]}>Lãi lỗ danh mục</Text>
                    <Icon
                      name="eye-off"
                      type="feather"
                      size={16}
                      color={colors.boldGray}
                    />
                  </View>

                  <View
                    style={{
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      gap: 4,
                    }}
                  >
                    <Text
                      style={[
                        {
                          fontFamily: "medium",
                          fontSize: 14,
                          color:
                            marketValue < investedValue
                              ? colors.red
                              : colors.green,
                        },
                      ]}
                    >
                      {formatNumber(marketValue - investedValue, true)}
                    </Text>
                    <Badge
                      value={`${formatNumber(changeRate, true)}%`}
                      badgeStyle={{
                        backgroundColor: "transparent",
                        borderColor: changeRate < 0 ? colors.red : colors.green,
                        borderWidth: 1,
                        backgroundColor:
                          changeRate < 0 ? colors.lightRed : colors.lightGreen,
                      }}
                      textStyle={{
                        color: changeRate < 0 ? colors.red : colors.green,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Text style={[gx.light]}>Lãi/Lỗ hôm nay</Text>
                    <Iconify
                      icon="octicon:info-16"
                      type="ionicon"
                      size={16}
                      color={colors.boldGray}
                    />
                  </View>
                  <Text style={[gx.number]}>0</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={[gx.textIcon]}>
                    <Text style={[gx.light]}>Tổng vốn</Text>
                    <Iconify
                      icon="octicon:info-16"
                      type="ionicon"
                      size={16}
                      color={colors.boldGray}
                    />
                  </View>
                  <Text style={[gx.number]}>{formatNumber(investedValue)}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={[gx.light]}>Tổng giá thị trường</Text>
                  <Text style={[gx.number]}>{formatNumber(marketValue)}</Text>
                </View>
              </View>

              {/* Actions */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Pressable
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                  onPress={() => setChecked(!checked)}
                >
                  {checked ? (
                    <Iconify
                      icon="ion:checkbox"
                      size={20}
                      color={colors.boldRed}
                    />
                  ) : (
                    <Iconify
                      icon="ion:square-outline"
                      size={20}
                      color={colors.boldRed}
                    />
                  )}
                  <Text style={[gx.light, { fontSize: 14 }]}>
                    Ẩn khối lượng
                  </Text>
                </Pressable>

                <Button
                  type="outline"
                  title="Bán nhiều mã"
                  containerStyle={{
                    borderRadius: 100,
                  }}
                  buttonStyle={{
                    borderRadius: 100,
                    borderColor: colors.red,
                    borderWidth: 1,
                    paddingVertical: 4,
                  }}
                  titleStyle={{
                    fontSize: 12,
                    color: colors.red,
                    fontFamily: "regular",
                    lineHeight: 14,
                  }}
                />
              </View>

              {/* Lists */}
              <View>
                <View>
                  <StockRow>
                    <Text style={[gx.light, { color: colors.boldGray }]}>
                      MÃ CP
                    </Text>
                    <Text style={[gx.light, { color: colors.boldGray }]}>
                      GIÁ VỐN
                    </Text>
                    <Text style={[gx.light, { color: colors.boldGray }]}>
                      GIÁ TT
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Text style={[gx.light, { color: colors.boldGray }]}>
                        KL
                      </Text>
                      <Icon
                        name="sort"
                        type="font-awesome"
                        size={10}
                        color={colors.boldGray}
                      />
                    </View>
                    <Text style={[gx.light, { color: colors.boldGray }]}>
                      LÃI/LỖ
                    </Text>
                  </StockRow>
                  <View>
                    {data.stocks.map((it, i) => (
                      <>
                        <StockAccordion
                          key={i}
                          data={data}
                          setData={setData}
                          id={i}
                          showVolume={!checked}
                          isEdit={isEdit}
                        />
                        {isEdit && (
                          <Button
                            title={"XÓA " + it.code}
                            buttonStyle={{
                              backgroundColor: "red",
                            }}
                            onPress={() => {
                              const newStocks = data.stocks.filter(
                                (stock, index) => index !== i
                              );
                              setData({ ...data, stocks: newStocks });
                            }}
                          />
                        )}
                      </>
                    ))}
                    {isEdit && (
                      <Button
                        title={"THÊM"}
                        containerStyle={{
                          marginTop: 40,
                        }}
                        buttonStyle={{
                          backgroundColor: "green",
                        }}
                        onPress={() => {
                          const newStocks = data.stocks.concat(emptyStock);
                          setData({ ...data, stocks: newStocks });
                        }}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>

      <BottomSection />
    </View>
  );
}

const StockRow = ({ children, containerStyle }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        ...containerStyle,
      }}
    >
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}
      >
        {children[0]}
      </View>
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
      >
        {children[1]}
      </View>
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}
      >
        {children[2]}
      </View>
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
      >
        {children[3]}
      </View>
      <View
        style={{
          flex: 1.5,
          alignItems: "center",
        }}
      >
        {children[4]}
      </View>
    </View>
  );
};

const StockAccordion = ({ data, setData, id, showVolume, isEdit }) => {
  const [expanded, setExpanded] = useState(false);

  function updateData(key, value) {
    setData((prev) => {
      const updatedData = prev.stocks.map((it, i) =>
        i === id ? { ...it, [key]: value } : it
      );
      return {
        ...prev,
        stocks: updatedData,
      };
    });
  }

  return (
    <View>
      <ListItem.Accordion
        key={id}
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
        noIcon
        content={
          <StockRow
            containerStyle={{
              width: "100%",
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: colors.gray,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Editable
                value={data.stocks[id].code}
                setValue={(value) => updateData("code", value)}
                textStyle={[
                  gx.number,
                  {
                    color: colors.green,
                  },
                ]}
                isText
                isEdit={isEdit}
              />
              {!isEdit && (
                <Icon
                  name={expanded ? "chevron-up" : "chevron-down"}
                  type="feather"
                  size={16}
                  color={colors.boldGray}
                />
              )}
            </View>
            <Editable
              value={data.stocks[id].orderPrice}
              setValue={(value) => updateData("orderPrice", value)}
              textStyle={[gx.number]}
              isEdit={isEdit}
            />
            <Editable
              value={data.stocks[id].marketPrice}
              setValue={(value) => updateData("marketPrice", value)}
              textStyle={[gx.number]}
              isEdit={isEdit}
            />
            {showVolume || isEdit ? (
              <Editable
                value={data.stocks[id].vol}
                setValue={(value) => updateData("vol", value)}
                textStyle={[gx.number]}
                isEdit={isEdit}
              />
            ) : (
              <Text style={[gx.regular, { fontSize: 16, lineHeight: 20 }]}>
                ***
              </Text>
            )}

            <Badge
              value="+10.04%"
              containerStyle={{
                width: "100%",
              }}
              badgeStyle={{
                width: "100%",
                backgroundColor: colors.green,
                height: 28,
              }}
              textStyle={[
                gx.regular,
                {
                  lineHeight: 24,
                },
              ]}
            />
          </StockRow>
        }
        containerStyle={{
          padding: 0,
        }}
      >
        <View style={{ gap: 4 }}>
          <View
            style={{
              ...gx.row,
              justifyContent: "space-around",
              backgroundColor: colors.gray,
              borderRadius: 8,
              paddingVertical: 4,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={[gx.light]}>Tổng vốn</Text>
              <Editable
                value={data.stocks[id].value}
                setValue={(value) => updateData("value", value)}
                textStyle={{
                  fontFamily: "medium",
                  fontSize: 12,
                  lineHeight: 12,
                }}
                isEdit={isEdit}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={[gx.light]}>Giá trị thị trường</Text>
              <Editable
                value={data.stocks[id].marketValue}
                setValue={(value) => updateData("marketValue", value)}
                textStyle={{
                  fontFamily: "medium",
                  fontSize: 12,
                  lineHeight: 12,
                }}
                isEdit={isEdit}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={[gx.light]}>Lãi / Lỗ</Text>
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: 12,
                  lineHeight: 12,
                  color:
                    data.stocks[0].marketValue > data.stocks[0].value
                      ? colors.green
                      : colors.red,
                }}
              >
                {data.stocks[0].marketValue - data.stocks[0].value}
              </Text>
            </View>
          </View>
          <View style={{ ...gx.row, gap: 4 }}>
            <View
              style={{
                flex: 1,
                ...gx.roundGray,
                padding: 8,
                justifyContent: "space-between",
              }}
            >
              {[
                {
                  title: "Tổng KL",
                  key: "totalVol",
                },
                {
                  title: "KL thường",
                  key: "normalVol",
                },
                {
                  title: "KL FS",
                  key: "fsVol",
                },
                {
                  title: "KL Khả dụng",
                  key: "availAmount",
                },
                {
                  title: "Outroom",
                  key: "outroom",
                },
              ].map((it, i) => (
                <View
                  style={{
                    ...gx.row,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={i}
                >
                  <Text style={[gx.light]}>{it.title}</Text>
                  {showVolume || isEdit ? (
                    <Editable
                      value={data.stocks[id][it.key]}
                      setValue={(value) => updateData(it.key, value)}
                      textStyle={[gx.medium]}
                      isEdit={isEdit}
                    />
                  ) : (
                    <Text style={[gx.medium]}>***</Text>
                  )}
                </View>
              ))}
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <View
                style={{
                  flex: 1,
                  ...gx.roundGray,
                  padding: 8,
                  alignContent: "space-between",
                }}
              >
                <View style={{ ...gx.row, justifyContent: "space-between" }}>
                  <View style={{ ...gx.row, gap: 2, alignItems: "center" }}>
                    <Text style={[gx.light]}>KL Khác</Text>
                    <Iconify
                      icon="octicon:info-16"
                      type="ionicon"
                      size={16}
                      color={colors.boldGray}
                    />
                  </View>
                  {showVolume || isEdit ? (
                    <Editable
                      value={data.stocks[id].others}
                      setValue={(value) => updateData("others", value)}
                      textStyle={[gx.medium]}
                      isEdit={isEdit}
                    />
                  ) : (
                    <Text style={[gx.medium]}>***</Text>
                  )}
                </View>
                <View style={{ ...gx.row, justifyContent: "space-between" }}>
                  <Text style={[gx.light]}>CPCT/Thưởng</Text>
                  {showVolume || isEdit ? (
                    <Editable
                      value={data.stocks[id].dividend}
                      setValue={(value) => updateData("dividend", value)}
                      textStyle={[gx.medium]}
                      isEdit={isEdit}
                    />
                  ) : (
                    <Text style={[gx.medium]}>***</Text>
                  )}
                </View>
              </View>
              <View style={{ flex: 1, ...gx.roundGray, padding: 8, gap: 4 }}>
                <Text style={[gx.medium]}>KL mua chờ về</Text>
                {[
                  {
                    title: "KL T0",
                    key: "t0Vol",
                  },
                  {
                    title: "KL T1",
                    key: "t1Vol",
                  },
                  {
                    title: "KL T2",
                    key: "t2Vol",
                  },
                ].map((it, i) => (
                  <View
                    style={{
                      ...gx.row,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    key={i}
                  >
                    <Text style={[gx.light]}>{it.title}</Text>
                    {showVolume || isEdit ? (
                      <Editable
                        value={data.stocks[id][it.key]}
                        setValue={(value) => updateData(it.key, value)}
                        textStyle={[gx.medium]}
                        isEdit={isEdit}
                      />
                    ) : (
                      <Text style={[gx.medium]}>***</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 8,
            marginVertical: 8,
            paddingBottom: 8,
            borderBottomWidth: 1,
            borderBottomColor: colors.gray,
          }}
        >
          <Button
            type="outline"
            title="Mua"
            containerStyle={{
              flex: 1,
            }}
            buttonStyle={{
              borderRadius: 100,
              paddingVertical: 6,
              borderColor: colors.green,
              borderWidth: 1,
            }}
            titleStyle={[
              gx.regular,
              {
                lineHeight: 14,
                color: colors.green,
              },
            ]}
          />
          <Button
            type="outline"
            title="Bán"
            containerStyle={{
              flex: 1,
            }}
            buttonStyle={{
              borderRadius: 100,
              paddingVertical: 6,
              borderColor: colors.red,
              borderWidth: 1,
            }}
            titleStyle={[
              gx.regular,
              {
                lineHeight: 14,
                color: colors.red,
              },
            ]}
          />
          <Button
            type="outline"
            title="Thông tin mã"
            containerStyle={{
              flex: 1,
            }}
            buttonStyle={{
              borderRadius: 100,
              paddingVertical: 6,
              borderColor: colors.boldGray,
              borderWidth: 1,
            }}
            titleStyle={[
              gx.regular,
              {
                lineHeight: 14,
                color: colors.boldGray,
              },
            ]}
          />
        </View>
      </ListItem.Accordion>
    </View>
  );
};

const BottomSection = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 16,
        backgroundColor: "white",
        borderTopColor: colors.gray,
        borderTopWidth: 1,
      }}
    >
      <Button
        title="Mua"
        containerStyle={{ flexGrow: 1 }}
        buttonStyle={{ borderRadius: 100, backgroundColor: colors.green }}
        titleStyle={{
          fontFamily: "medium",
          fontSize: 14,
          lineHeight: 16,
        }}
      />
      <Button
        title="Bán"
        containerStyle={{ flexGrow: 1 }}
        buttonStyle={{ borderRadius: 100, backgroundColor: colors.red }}
        titleStyle={{
          fontFamily: "medium",
          fontSize: 14,
          lineHeight: 16,
        }}
      />
    </View>
  );
};
