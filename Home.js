import React, { useState } from "react";
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { datasource as ogData } from "./Data.js";

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
        textAlign: "center",
    },
    opacityStyle: {
        borderWidth: 1,
    },
    container: {
        margin: 10
    },
    buttonStyle: {
        margin: 10,
    },
});

const Home = ({ navigation }) => {
    const [datasource, setDatasource] = useState(ogData);

    const count = () => {
        let completed = 0;
        let notComplete = 0;
        let total = 0;
        datasource.forEach((section) => {
            section.data.forEach((item) => {
                total++;
                if (item.status === "Completed") {
                    completed++;
                } else if (item.status === "Not Complete") {
                    notComplete++;
                }
            });
        });
        return { completed, notComplete, total };
    };

    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => {
                    navigation.navigate("Edit", {
                        key: item.description,
                        type: item.status,
                        index: index,
                        sectionIndex: datasource.indexOf(section),
                        datasource,
                        setDatasource,
                    });
                }}
            >
                <Text style={styles.textStyle}>
                    {item.description} - {item.status}
                </Text>
            </TouchableOpacity>
        );
    };

    const overall = () => {
        const { completed, notComplete, total } = count();
        const completion = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
        Alert.alert(
            "",
            `Completed Tasks: ${completed}\nIncomplete Tasks: ${notComplete}\n${completion}% of tasks complete`
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <SectionList sections={datasource} renderItem={renderItem} />
            <View style={styles.buttonStyle}>
                <Button
                    title="ADD TASK"
                    onPress={() => {
                        navigation.navigate("Add", { setDatasource });
                    }}
                />
            </View>
            <View style={styles.buttonStyle}>
                <Button title="OVERALL STATUS" onPress={overall} />
            </View>
        </View>
    );
};

export default Home;
