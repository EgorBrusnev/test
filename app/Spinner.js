import { ActivityIndicator } from "react-native";
import React, { Component } from "react";
import { indicatorStyles, spinnerProps } from "./styles";

export default (isDataLoading) => {
	if (isDataLoading) {
		return (
			<ActivityIndicator style={indicatorStyles.center} size={spinnerProps.size} color={spinnerProps.color} />
		);
	} else return null;
};



