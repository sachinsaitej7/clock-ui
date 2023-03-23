import React, { useState, createContext, useMemo, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebase } from "@firebase";
import { useUserProfile, addProfile, updateProfile } from "./hooks";

const OnboardingContext = createContext();
const ProfileContext = createContext();

export function useOnboardingContext() {
  const context = React.useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error(
      "useOnboardingContext must be used within a OnboardingProvider"
    );
  }
  return context;
}

// provider
export const OnboardingProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
    setDirection(1);
  }, []);

  const prevStep = useCallback(() => {
    setStep((prev) => prev - 1);
    setDirection(-1);
  }, []);

  const value = useMemo(
    () => ({
      step,
      setStep,
      direction,
      nextStep,
      prevStep,
    }),
    [step, direction, nextStep, prevStep]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export function useProfileContext() {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
}

export const ProfileProvider = ({ children }) => {
  const { auth } = getFirebase();
  const [user] = useAuthState(auth);
  const [profile, profileLoading] = useUserProfile(user.uid);

  const addUserProfile = useCallback(
    (data) => {
      const { uid } = user;
      return addProfile(uid, data);
    },
    [user]
  );

  const updateUserProfile = useCallback(
    (data) => {
      const { uid } = user;
      return updateProfile(uid, data);
    },
    [user]
  );

  const value = useMemo(
    () => ({ profile, profileLoading, addUserProfile, updateUserProfile }),
    [profile, profileLoading, addUserProfile, updateUserProfile]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
