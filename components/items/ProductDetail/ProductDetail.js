import React, { useState, useEffect } from 'react';
import { Button, View, TouchableOpacity, Text, Image, StyleSheet, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { VictoryPie } from 'victory-native';
import { Svg } from 'react-native-svg';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../constants/base_URL';
import scaleScore from '../../../utils';


export default function ProductDetail({ navigation, route }) {
    const data = route.params.data
    const { isconnect, email } = useSelector(state => state.userReducer);
    let categoriesData = [
        {
            id: 1,
            name: "Agriculture",
            icon: icons.education,
            color: COLORS.yellow,
            impact: Math.round(data.impact_environnemental['Score unique EF']['etapes']['Agriculture'] * 100) / 100
        },
        {
            id: 2,
            name: "Transformation",
            icon: icons.education,
            color: COLORS.lightBlue,
            impact: Math.round(data.impact_environnemental['Score unique EF']['etapes']['Transformation'] * 100) / 100
        },
        {
            id: 3,
            name: "Emballage",
            icon: icons.education,
            color: COLORS.darkgreen,
            impact: Math.round(data.impact_environnemental['Score unique EF']['etapes']['Emballage'] * 100) / 100
        },
        {
            id: 4,
            name: "Transport",
            icon: icons.education,
            color: COLORS.peach,
            impact: Math.round(data.impact_environnemental['Score unique EF']['etapes']['Transport'] * 100) / 100
        },
        {
            id: 5,
            name: "Supermarché et distribution",
            icon: icons.education,
            color: COLORS.purple,
            impact: Math.round(data.impact_environnemental['Score unique EF']['etapes']['Supermarché et distribution'] * 100) / 100
        },
        {
            id: 6,
            name: "Consommation",
            icon: icons.education,
            color: COLORS.red,
            impact: Math.round(data.impact_environnemental['Score unique EF']['etapes']['Consommation'] * 100) / 100
        },
    ]
    const [isFavoris, setisFavoris] = React.useState(false);
    const [loading, setloading] = React.useState(false);
    const [categories, setCategories] = React.useState(categoriesData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)

    const checkFavoris = (id) => {
        setloading(true);
        axios.get(`${BASE_URL}/posts/checkfavoris/${id}`).then((response) => {
            setloading(false);
            setisFavoris(response.data)
            console.log(isFavoris);
        });
    }

    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
        checkFavoris(data['ciqual_code'])
    }, []);



    function processCategoryDataToDispalay() {
        //Filter expenses with "Confirmed" status 

        //Calculate percentage  and repopulate  chart data
        let finalChartData = categories.map((item) => {
            let percentage = (item.impact / data.impact_environnemental['Score unique EF']['synthese'] * 100).toFixed(0)
            return {
                label: `${percentage > 2 ? `${percentage}%` : " "}`,
                y: Number(item.impact),
                expenseCount: 1,
                color: item.color,
                name: item.name,
                id: item.id
            }
        })

        return finalChartData;


    }

    function setSelectCategoryByName(name) {
        let category = categories.filter(a => a.name == name)
        setSelectedCategory(category[0])
    }

    function processCategoryDataToDisplay() {
        // Filter expenses with "Confirmed" status
        let chartData = categories.map((item) => {
            return {
                name: item.name,
                y: item.impact,
                expenseCount: 1,
                color: item.color,
                id: item.id
            }
        })

        return chartData
    }

    function toogleFavoris(id) {
        // Filter expenses with "Confirmed" status
        setloading(true);
        if (isFavoris) {
            axios.post(`${BASE_URL}/posts/favoris/delete/${id}`).then((response) => {
                setloading(false);
                if (response.data == "Favoris delete") {
                    setisFavoris(false);
                }
            });
        } else {
            axios.post(`${BASE_URL}/posts/favoris/update/${id}`).then((response) => {
                setloading(false);
                if (response.data == "Favoris update") {
                    setisFavoris(true);
                }
            });
        }
    }

    function renderExpenseSummary() {
        let data = processCategoryDataToDisplay()

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: (selectedCategory && selectedCategory.name == item.name) ? item.color : COLORS.white,
                }}
                onPress={() => {
                    let categoryName = item.name
                    setSelectCategoryByName(categoryName)
                }}
            >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : item.color,
                            borderRadius: 5
                        }}
                    />
                    <Text style={{ marginLeft: SIZES.base, color: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>{item.name}</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>{item.y} {item.label}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <View style={{ padding: SIZES.padding }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                />
            </View>

        )
    }
    function renderChart() {
        let chartData = processCategoryDataToDispalay();
        let colorScales = chartData.map((item) => item.color)
        let totalExpenseCount = chartData.reduce((a, b) => a + (b.expenseCount || 0), 0)
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: -40 }}>
                <Svg width={SIZES.width} height={SIZES.width} style={{ width: "100%", height: "auto" }}>

                    <VictoryPie
                        standalone={false} // Android workaround
                        data={chartData}
                        labels={(datum) => `${datum.y}`}
                        radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                        innerRadius={70}
                        labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                        style={{
                            labels: { fill: "white", ...FONTS.body3 },
                            parent: {
                                ...styles.shadow
                            },
                        }}
                        width={SIZES.width}
                        height={SIZES.width}
                        colorScale={colorScales}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let categoryName = chartData[props.index].name
                                            setSelectCategoryByName(categoryName)
                                        }
                                    }]
                                }
                            }
                        }]}
                    />
                </Svg>
                <View style={{ position: 'absolute' }}>
                    <Text style={{ ...FONTS.h1, textAlign: 'center', color: scaleScore(data.impact_environnemental['Score unique EF']['synthese']) }}>{Math.round(data.impact_environnemental['Score unique EF']['synthese'] * 100) / 100}</Text>
                    <Text style={{ ...FONTS.body3, textAlign: 'center' }}>{data.impact_environnemental['Score unique EF']['unite']}</Text>
                </View>
            </View>

        )
    }

    return (

        <View>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <TouchableOpacity style={{ flexDirection: "row", marginTop: 40 }} onPress={() => navigation.navigate('Feed')}>
                <Image
                    source={require('../assets/icons/MenuIcon.png')}
                    style={{ width: 24, height: 24 }}
                />
                <Text style={{ fontWeight: "bold", marginLeft: 8 }}>Retour</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row", marginTop: 40, borderWidth:1, borderRadius:20  ,marginRight: 10 ,padding:10}} onPress={() => navigation.navigate('Infos')}>
                <Text style={{ fontWeight: "bold", textAlign:"center" }}>Infos sur le résultat</Text>
            </TouchableOpacity>
            </View>
            <View style={{ borderWidth: 1, marginVertical: 10, alignItems: "center", marginHorizontal: 10, borderRadius: 20, marginBottom: -20 }}>


                <Text style={{ textAlign: "center", marginTop: 10, fontWeight: "bold", fontSize: 15, color: "black", justifyContent: "center", marginBottom: 10 }}>{data.nom_francais}</Text>
                {email != null && isconnect && <TouchableOpacity onPress={() => toogleFavoris(data['ciqual_code'])}>
                    <Icon
                        name="md-star"
                        color={isFavoris == true ? "orange" : "gray"}
                        size={30}
                        style={{ marginLeft: 10 }}
                    />
                </TouchableOpacity>}
            </View>
            {<View>
                {renderChart()}
                <View><Text style={{ textAlign: "center", marginTop: 5, fontSize: 18, marginBottom: -10 }}>{`Impact environnemental`}</Text></View>
                {renderExpenseSummary()}
            </View>}
        </View>

    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "red",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    }
})