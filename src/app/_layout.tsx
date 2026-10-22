import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Oswald_500Medium, Oswald_700Bold } from '@expo-google-fonts/oswald';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '@/lib/theme';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Oswald_500Medium,
    Oswald_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  // On web the static export already links the fonts in <head>, and holding back
  // the tree would make the first render differ from the pre-rendered HTML.
  if (!fontsLoaded && Platform.OS !== 'web') {
    return <View style={{ flex: 1, backgroundColor: colors.bg }} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Slot />
    </SafeAreaProvider>
  );
}
