import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { colors } from "../theme/colors";
import { Icon, Header, Input, Button, SocialIcon } from "@rneui/base";
import { Iconify } from "react-native-iconify";
import { gx } from "../theme/global-styles";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Editable from "../components/Editable";
import Collapsible from "react-native-collapsible";

const Tab = createMaterialTopTabNavigator();

export default function OrderBookScreen({ navigation }) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <Header
        backgroundColor="white"
        containerStyle={{
          borderBottomColor: "transparent",
          paddingHorizontal: 16,
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
              Sổ lệnh
            </Text>
          </Pressable>
        }
        leftComponent={
          <Pressable onPress={() => navigation.navigate("STOCKS")}>
            <Icon name="chevron-left" type="feather" color={colors.text} />
          </Pressable>
        }
        rightComponent={
          <View
            style={[
              gx.row,
              {
                gap: 4,
                borderColor: colors.iconText,
                borderWidth: 1,
                borderRadius: 100,
                paddingHorizontal: 4,
                paddingVertical: 2,
              },
            ]}
          >
            <Text style={[gx.regular, { color: colors.text }]}>TK</Text>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: colors.iconText,
                borderRadius: 100,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 12,
                  lineHeight: 21,
                  fontFamily: "medium",
                }}
              >
                6
              </Text>
            </View>
          </View>
        }
      />

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontFamily: "bold",
            textTransform: "none",
          },
          tabBarItemStyle: {
            margin: 0,
            padding: 0,
            width: "auto",
            borderBottomColor: colors.lightGray,
            borderBottomWidth: 2,
            paddingHorizontal: 8,
          },
          tabBarStyle: {
            elevation: 0,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.boldRed,
          },
          tabBarIndicatorContainerStyle: {
            zIndex: 1,
          },
          tabBarActiveTintColor: colors.boldRed,
          tabBarInactiveTintColor: colors.grayText,
          tabBarScrollEnabled: true,
          tabBarPressColor: "transparent",
        }}
      >
        <Tab.Screen
          name="TODAY_ORDER"
          options={{ tabBarLabel: "Lệnh trong ngày" }}
        >
          {(props) => <TodayOrder {...props} isEdit={isEdit} />}
        </Tab.Screen>
        <Tab.Screen
          name="LDK"
          component={OrderHistory}
          options={{ tabBarLabel: "Lệnh điều kiện" }}
        />
        <Tab.Screen
          name="PKT"
          component={OrderHistory}
          options={{ tabBarLabel: "Phiên kế tiếp" }}
        />
        <Tab.Screen
          name="XNDL"
          component={OrderHistory}
          options={{ tabBarLabel: "Xác nhận lệnh đặt" }}
        />
        <Tab.Screen
          name="ORDER_HISTORY"
          options={{ tabBarLabel: "Lịch sử lệnh" }}
        >
          {(props) => <OrderHistory {...props} isEdit={isEdit} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

const TodayOrder = ({ isEdit = false }) => {
  const emptyOrder = {
    symbol: "?",
    time: "00:00",
    side: "M/B",
    type: "Thường",
    orderQty: 0,
    orderPrice: 0,
    matchedQty: 0,
    matchedPrice: 0,
    status: "Đã khớp",
  };

  const [data, setData] = useState([
    {
      symbol: "PXL",
      time: "14:43",
      side: "Mua",
      type: "Thường",
      orderQty: 1,
      orderPrice: 14.1,
      matchedQty: 1,
      matchedPrice: 14.1,
      status: "Đã khớp",
    },
    emptyOrder,
  ]);

  function updateData(key, value, id) {
    setData((prev) => {
      return prev.map((it, i) => (i === id ? { ...it, [key]: value } : it));
    });
  }

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 12,
            paddingRight: 8,
            paddingVertical: 4,
            borderColor: colors.lightGray,
            borderWidth: 1,
            marginTop: 4,
            borderRadius: 4,
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              fontFamily: "medium",
              fontSize: 14,
              lineHeight: 16,
              paddingTop: 0,
              paddingBottom: 0,
            }}
            placeholder="Mã chứng khoán"
            placeholderTextColor={colors.grayText}
          />
          <Iconify icon="feather:chevron-right" color="#333333" size={20} />
        </View>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
          {["Tất cả loại lệnh", "Tất cả trạng thái"].map((it, i) => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 8,
                paddingVertical: 0,
                borderColor: colors.lightGray,
                borderWidth: 1,
                borderRadius: 4,
                justifyContent: "space-between",
              }}
              key={i}
            >
              <TextInput
                style={{
                  fontFamily: "regular",
                  fontSize: 14,
                  lineHeight: 16,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                placeholder={it}
                placeholderTextColor={colors.text}
              />
              <Iconify
                icon="feather:chevron-right"
                color={colors.text}
                size={20}
              />
            </View>
          ))}
        </View>
        <View
          style={{
            alignItems: "flex-end",
            paddingRight: 4,
          }}
        >
          <Image
            source={require("../assets/images/safy.gif")}
            style={{ width: 60, height: 50 }}
          />
        </View>
      </View>
      <View style={{ padding: 12 }}>
        <OrderRow
          containerStyle={{
            paddingHorizontal: 8,
            paddingBottom: 8,
          }}
        >
          {["Mã CK", "M/B", "Đặt", "Khớp", "Còn lại"].map((it, i) => (
            <Text style={gx.regular} key={i}>
              {it}
            </Text>
          ))}
        </OrderRow>
        <View style={{ gap: 12 }}>
          {data.map((it, i) => (
            <>
              <OrderRow
                containerStyle={{
                  paddingHorizontal: 4,
                  paddingTop: 4,
                  backgroundColor: "white",
                  borderRadius: 4,
                  paddingBottom: 12,
                }}
                key={i}
              >
                <View style={{ alignItems: "flex-start" }}>
                  <Editable
                    value={it.symbol}
                    setValue={(value) => updateData("symbol", value, i)}
                    textStyle={{ fontFamily: "bold", fontSize: 16 }}
                    isEdit={isEdit}
                  />
                  <Editable
                    value={it.time}
                    setValue={(value) => updateData("time", value, i)}
                    textStyle={[gx.regular]}
                    isEdit={isEdit}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <Editable
                    value={it.side}
                    setValue={(value) => updateData("side", value, i)}
                    textStyle={{
                      fontFamily: "semibold",
                      fontSize: 14,
                      color: it.side === "Mua" ? colors.green : colors.red,
                    }}
                    isEdit={isEdit}
                  />
                  <Editable
                    value={it.type}
                    setValue={(value) => updateData("type", value, i)}
                    textStyle={[gx.regular]}
                    isEdit={isEdit}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <Editable
                    value={it.orderQty}
                    setValue={(value) => updateData("orderQty", value, i)}
                    textStyle={{ fontFamily: "semibold", fontSize: 14 }}
                    isEdit={isEdit}
                  />
                  <Editable
                    value={it.orderPrice}
                    setValue={(value) => updateData("orderPrice", value, i)}
                    textStyle={[gx.regular]}
                    isEdit={isEdit}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <Editable
                    value={it.matchedQty}
                    setValue={(value) => updateData("matchedQty", value, i)}
                    textStyle={{ fontFamily: "semibold", fontSize: 14 }}
                    isEdit={isEdit}
                  />
                  <Editable
                    value={it.matchedPrice}
                    setValue={(value) => updateData("matchedPrice", value, i)}
                    textStyle={[gx.regular]}
                    isEdit={isEdit}
                  />
                </View>
                <View style={{ alignItems: "center", paddingRight: 12 }}>
                  <Editable
                    value={it.status}
                    setValue={(value) => updateData("status", value, i)}
                    textStyle={{
                      fontFamily: "semibold",
                      fontSize: 12,
                      marginTop: 24,
                      color: colors.green,
                    }}
                    isEdit={isEdit}
                  />
                </View>
              </OrderRow>
              {isEdit && (
                <Button
                  title={"XÓA"}
                  buttonStyle={{
                    backgroundColor: "red",
                  }}
                  onPress={() => {
                    setData(data.filter((it, j) => j !== i));
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
                setData(data.concat(emptyOrder));
              }}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const OrderHistory = ({ isEdit = false }) => {
  const emptyEntry = {
    symbol: "?",
    status: "Khớp",
    price: 0,
    qty: 1,
    side: "M/B",
    placedTime: "00:00:00",
    matchedTime: "00:00:00",
    matchedQty: 0,
    avgMatchedPrice: 0,
  };

  const [data, setData] = useState([
    {
      date: "01/01/2022",
      orders: [
        {
          symbol: "PXL",
          status: "Khớp",
          price: 14.1,
          qty: 1,
          side: "MUA",
          placedTime: "00:00:00",
          matchedTime: "00:00:00",
          matchedQty: 0,
          avgMatchedPrice: 0,
        },
        emptyEntry,
        emptyEntry,
        emptyEntry,
        emptyEntry,
      ],
    },
  ]);

  const [filter, setFilter] = useState({
    from: "16/04/2024",
    to: "15/05/2024",
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          paddingHorizontal: 8,
          gap: 8,
        }}
      >
        <View
          style={[
            gx.row,
            {
              marginTop: 12,
              gap: 8,
              alignItems: "flex-end",
              paddingHorizontal: 2,
            },
          ]}
        >
          <Input
            containerStyle={{
              borderWidth: 0,
              padding: 0,
              height: 40,
              flex: 1,
            }}
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 4,
              paddingHorizontal: 8,
              backgroundColor: "white",
              borderColor: "#D6D6D6",
              height: 40,
              marginHorizontal: -10,
            }}
            inputStyle={[
              gx.regular,
              {
                lineHeight: 16,
                fontSize: 14,
              },
            ]}
            leftIcon={
              <Iconify icon="ic:twotone-search" color="black" size={24} />
            }
            placeholder="Tìm kiếm theo mã CK"
            placeholderTextColor={colors.grayText}
          />
          <View>
            <Image
              source={require("../assets/images/filter.jpg")}
              style={{ width: 36, height: 36 }}
            />
          </View>
        </View>

        <View
          style={[
            gx.row,
            {
              borderWidth: 0.5,
              borderColor: "black",
              borderRadius: 4,
              paddingVertical: 10,
              paddingHorizontal: 24,
              justifyContent: "space-around",
            },
          ]}
        >
          <Editable
            value={filter.from}
            setValue={(value) => setFilter({ ...filter, from: value })}
            textStyle={[
              gx.regular,
              { color: colors.boldRed, fontSize: 13, lineHeight: 14 },
            ]}
            isEdit={isEdit}
            isText
          />
          <Iconify
            icon="heroicons:arrow-right-16-solid"
            color={colors.boldGray}
            size={16}
          />
          <Editable
            value={filter.to}
            setValue={(value) => setFilter({ ...filter, to: value })}
            textStyle={[
              gx.regular,
              { color: colors.boldRed, fontSize: 13, lineHeight: 14 },
            ]}
            isEdit={isEdit}
            isText
          />
        </View>

        <View
          style={{
            borderBottomColor: colors.gray,
            borderBottomWidth: 1,
          }}
        />
      </View>

      <ScrollView>
        {data.map((it, i) => (
          <View key={i}>
            {/* Date */}
            <View
              style={[
                gx.row,
                { justifyContent: "center", gap: 16, paddingVertical: 8 },
              ]}
            >
              <View
                style={{
                  height: 2,
                  width: 32,
                  backgroundColor: colors.boldGray,
                }}
              />
              <Editable
                value={it.date}
                setValue={(value) => {
                  const newHistory = data.map((it, j) =>
                    i === j ? { ...it, date: value } : it
                  );
                  setData(newHistory);
                }}
                textStyle={[
                  gx.regular,
                  { color: colors.boldGray, fontSize: 14 },
                ]}
                isEdit={isEdit}
                isText
              />
              <View
                style={{
                  height: 2,
                  width: 32,
                  backgroundColor: colors.boldGray,
                }}
              />
            </View>

            {/* Orders */}
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 4,
              }}
            >
              {it.orders.map((_, j) => (
                <HistoryEntry
                  key={j}
                  data={data}
                  setData={setData}
                  historyId={i}
                  id={j}
                  isEdit={isEdit}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const OrderRow = ({ children, containerStyle }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        ...containerStyle,
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>{children[0]}</View>
      <View style={{ flex: 1, alignItems: "center" }}>{children[1]}</View>
      <View style={{ flex: 1, alignItems: "center" }}>{children[2]}</View>
      <View style={{ flex: 1, alignItems: "center" }}>{children[3]}</View>
      <View
        style={{
          flex: 2,
          alignItems: "flex-end",
        }}
      >
        {children[4]}
      </View>
    </View>
  );
};

const HistoryEntry = ({ data, setData, historyId, id, isEdit }) => {
  function updateData(key, value) {
    // console.log(data);
    setData((prev) =>
      data[historyId].orders.map((it, i) =>
        i === id ? { ...it, [key]: value } : it
      )
    );
  }

  const [collapsed, setCollapsed] = useState(true);

  return (
    <View
      style={{
        backgroundColor: "white",
        elevation: 2,
        marginBottom: 12,
        borderRadius: 8,
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          paddingHorizontal: 8,
          paddingVertical: 12,
          gap: 24,
        }}
        onPress={() => setCollapsed(!collapsed)}
      >
        {/* 1st column */}
        <View style={{ flex: 1 }}>
          <Editable
            value={data[historyId].orders[id].symbol}
            setValue={(value) => updateData("symbol", value)}
            textStyle={{
              fontFamily: "bold",
              color: colors.text,
              fontSize: 14,
              paddingLeft: 8,
              marginBottom: 12,
            }}
            isEdit={isEdit}
            isText
          />
          <View
            style={[
              gx.row,
              {
                gap: 12,
                backgroundColor: colors.lightGray,
                borderRadius: 8,
                paddingHorizontal: 8,
              },
            ]}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 100,
                backgroundColor:
                  data[historyId].orders[id].status == "Khớp"
                    ? colors.green
                    : colors.red,
              }}
            />
            <Editable
              value={data[historyId].orders[id].status}
              setValue={(value) => updateData("status", value)}
              textStyle={[gx.regular, { color: colors.text, fontSize: 14 }]}
              isEdit={isEdit}
              isText
            />
          </View>
        </View>

        {/* 2nd column */}
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <Editable
            value={data[historyId].orders[id].price}
            setValue={(value) => updateData("price", value)}
            textStyle={[gx.regular, { color: colors.text, fontSize: 14 }]}
            isEdit={isEdit}
            isText
          />
          <Text style={[gx.regular, { color: colors.boldGray, fontSize: 14 }]}>
            Giá
          </Text>
        </View>

        {/* 3rd column */}
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <Editable
            value={data[historyId].orders[id].qty}
            setValue={(value) => updateData("qty", value)}
            textStyle={[gx.regular, { color: colors.text, fontSize: 14 }]}
            isEdit={isEdit}
            isText
          />
          <Text style={[gx.regular, { color: colors.boldGray, fontSize: 14 }]}>
            Khối lượng
          </Text>
        </View>

        {/* 4th column */}
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
          }}
        >
          <Editable
            value={data[historyId].orders[id].side}
            setValue={(value) => updateData("side", value)}
            textStyle={[
              gx.regular,
              {
                color:
                  data[historyId].orders[id].side === "MUA"
                    ? colors.green
                    : colors.red,
                fontSize: 14,
              },
            ]}
            isEdit={isEdit}
            isText
          />
        </View>
      </Pressable>

      <Collapsible collapsed={collapsed}>
        <View
          style={{
            backgroundColor: colors.lightGray,
            padding: 8,
          }}
        >
          {[
            {
              title: "Thời gian đặt",
              key: "placedTime",
            },
            {
              title: "Thời gian khớp",
              key: "matchedTime",
            },
            {
              title: "Khôi lượng khớp",
              key: "matchedQty",
            },
            {
              title: "Giá khớp trung bình",
              key: "avgMatchedPrice",
            },
          ].map((it, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 4,
              }}
            >
              <Text
                style={[gx.regular, { color: colors.boldGray, fontSize: 14 }]}
              >
                {it.title}
              </Text>
              <Editable
                value={data[historyId].orders[id][it.key]}
                setValue={(value) => updateData(it.key, value)}
                textStyle={[
                  { fontFamily: "semibold", color: colors.text, fontSize: 12 },
                ]}
                isEdit={isEdit}
                isText
              />
            </View>
          ))}
        </View>
      </Collapsible>

      {isEdit && (
        <Button
          title={"XÓA"}
          buttonStyle={{
            backgroundColor: "red",
          }}
          onPress={() =>
            setData((prev) => {
              return prev[historyId].orders.filter((_, i) => i !== id);
            })
          }
        />
      )}

      <View
        style={{
          backgroundColor: colors.lightGray,
          height: collapsed ? 12 : 0,
        }}
      />
    </View>
  );
};
