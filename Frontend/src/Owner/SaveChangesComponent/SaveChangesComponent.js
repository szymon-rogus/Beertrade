import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

import {changesSaver} from "./SaveChangesComponentStyles";

// const SAVING = "SAVING";
export const SAVED = "SAVED";
export const UNSAVED = "UNSAVED";

export default function SaveChangesComponent(props) {
  const {ss,onSave} = props;
  if (ss === SAVED) {
    return (<View style={changesSaver.bar}><Text style={changesSaver.text}>No changes.</Text></View>)
  } else if (ss === UNSAVED) {
    return (<View style={changesSaver.bar}>
      <Text style={changesSaver.text}>You have unsaved changes</Text>
      <TouchableOpacity style={changesSaver.button} onPress={onSave()}>
        <Text style={changesSaver.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>)
  }
}
