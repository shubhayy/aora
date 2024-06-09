import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Dimensions, Image, Alert } from "react-native";
import { Link, router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {

    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setSubmitting(true)
    
    try {
      const result = await createUser(form.email, form.password, form.username)

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View
        className="flex-1 px-4 pt-12"
        style={{
          minHeight: Dimensions.get("window").height - 100,
        }}
      >
        <Image
          source={images.logo}
          resizeMode="contain"
          className="w-[115px] h-[34px] self-center pt-24"
        />

        <Text className="text-2xl font-semibold text-white mt-10 font-psemibold text-center">
          Sign up for Aora
        </Text>
        <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-7 w-full"
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-7 w-full"
        />

        <CustomButton
          title="Sign Up"
          handlePress={submit}
          containerStyles="mt-7 w-full"
          isLoading={isSubmitting}
        />
        
        <View className="flex justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Have an account?
          </Text>
          <Link
            href="/sign-in"
            className="text-lg font-psemibold text-secondary"
          >
            Signin
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
