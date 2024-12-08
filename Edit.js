import React, { useState } from "react";
import { TextInput, View, Text, Button, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const Edit = ({ navigation, route }) => {
    const { key, type, index, sectionIndex, datasource, setDatasource } = route.params;
    const [description, setDescription] = useState(key);
    const [status, setStatus] = useState(type);

    const handleSave = () => {
        const updatedDatasource = [...datasource];
        const updatedSectionData = [...updatedDatasource[sectionIndex].data];
        updatedSectionData[index] = { ...updatedSectionData[index], description, status };

        updatedDatasource[sectionIndex] = { ...updatedDatasource[sectionIndex], data: updatedSectionData };

        setDatasource(updatedDatasource);

        navigation.goBack();
    };

    const handleDelete = () => {
        Alert.alert("Are you sure?", "This will delete the task.", [
            {
                text: "Yes",
                onPress: () => {
                    const updatedDatasource = [...datasource];
                    const updatedSectionData = updatedDatasource[sectionIndex].data.filter(
                        (_, tIndex) => tIndex !== index
                    );

                    updatedDatasource[sectionIndex] = { ...updatedDatasource[sectionIndex], data: updatedSectionData };
                    setDatasource(updatedDatasource);

                    navigation.goBack();
                },
            },
            { text: "No" },
        ]);
    };

    return (
        <View style={{ margin: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Description:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <Text style={{ fontWeight: "bold" }}>Status:</Text>
            <RNPickerSelect
                value={status}
                onValueChange={(value) => setStatus(value)}
                items={[
                    { label: "Not Complete", value: "Not Complete" },
                    { label: "Completed", value: "Completed" },
                ]}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <View style={{ flex: 1, marginRight: 10, paddingLeft: 10 }}>
                    <Button title="Save" onPress={handleSave} />
                </View>
                <View style={{ flex: 1, marginLeft: 10, paddingRight: 10 }}>
                    <Button title="Delete" onPress={handleDelete} />
                </View>
            </View>
        </View>
    );
};

export default Edit;
