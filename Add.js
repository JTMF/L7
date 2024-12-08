import React, { useState } from "react";
import { TextInput, View, Text, Button, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const Add = ({ navigation, route }) => {
    const { setDatasource } = route.params;
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Not Complete");

    const handleSubmit = () => {
        if (!description.trim()) {
            Alert.alert("Please enter a task description.");
            return;
        }

        const newTask = { description, status };
        const sectionIndex = status === "Completed" ? 0 : 1;

        setDatasource((prevDatasource) => {
            const updatedDatasource = [...prevDatasource];
            updatedDatasource[sectionIndex].data.push(newTask);
            return updatedDatasource;
        });

        navigation.navigate("Home");
    };

    return (
        <View style={{ padding: 10 }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: "bold" }}>Description</Text>
                <TextInput
                    style={{ borderWidth: 1, marginBottom: 10 }}
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                />
            </View>

            <View style={{ padding: 10 }}>
                <RNPickerSelect
                    value={status}
                    onValueChange={(value) => setStatus(value)}
                    items={[
                        { label: "Not Complete", value: "Not Complete" },
                        { label: "Completed", value: "Completed" }
                    ]}
                />
            </View>

            <Button title="SUBMIT" onPress={handleSubmit} />
        </View>
    );
};

export default Add;

