import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  clearSessionButton: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    backgroundColor: "darkblue",
    width: 130,
    height: 50,
  },
  clearSessionButtonDisabled: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    backgroundColor: "grey",
    width: 130,
    height: 50,
  },
  loadingPageStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsPageContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  sessionText: {
    fontSize: 28,
    marginBottom: 15,
    color: "black",
  },
  sessionSwitchSelector: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  clearSessionButtonText: {
    color: "white",
  },
});
