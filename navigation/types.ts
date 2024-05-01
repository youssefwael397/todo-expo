import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  CreateTodo: undefined;
  EditTodo: {
    todo: ITodo;
  };
  Login: undefined;
  Register: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
    namespace ReactNavigation{
        interface RootParamList extends RootStackParamList {}
    }
}
