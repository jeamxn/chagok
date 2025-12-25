import { useNavigation as useRNNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { StackParamList } from "@/navigation/types";

const useNavigation = () => useRNNavigation<NativeStackNavigationProp<StackParamList>>();

export default useNavigation;
