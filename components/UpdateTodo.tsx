import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  Text,
  TextArea,
} from 'native-base';
import { useEffect, useRef, useState } from 'react';
import { colors } from '../utils/theme/colors';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ResetError, createNewTodo, deleteTodoById, updateTodo } from '../redux/todoSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AddTodoSchema = Yup.object().shape({
  title: Yup.string().required('Please enter a title'),
});

function UpdateTodo({ todo }: { todo: ITodo }) {
  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [newTodo, setNewTodo] = useState<ITodo>(todo);
  const { error, loading } = useSelector((state: RootState) => state.todos);

  const handleUpdateTask = ({ title }: { title: string }) => {
    dispatch(updateTodo({...newTodo,title}));
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleDelete = () => {
    dispatch(deleteTodoById(newTodo.id));
    navigation.navigate('Todos')
  }

  useEffect(() => {
    dispatch(ResetError());
  }, []);

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Edit task</Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{ title: newTodo.title }}
              validationSchema={AddTodoSchema}
              onSubmit={handleUpdateTask}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <TextArea
                    style={styles.input}
                    placeholder="Write task description"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    autoCapitalize="none"
                    variant="unstyled"
                    multiline={true}
                    lineHeight={10}
                    autoCompleteType={undefined}
                  />

                  {touched.title && errors.title && (
                    <Text style={styles.error}>{errors.title}</Text>
                  )}

                  {error && <Text style={styles.error}>{error.message}</Text>}

                  <Box style={styles.buttonsContainer}>
                    <IconButton
                      icon={
                        <Feather name="delete" size={18} color={colors.blu500} />
                      }
                      onPress={() => handleDelete()}
                      style={styles.button}
                      disabled={loading}
                    />
                    

                    <Button
                      style={styles.button}
                      onPress={() => handleSubmit()}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Text style={styles.buttonText}>Edit</Text>
                      )}
                    </Button>
                  </Box>
                </>
              )}
            </Formik>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <IconButton
        icon={<Feather name="edit" size={18} color={colors.blu500} />}
        onPress={() => handleOpenModal()}
        style={styles.addButton}
      />
    </>
  );
}

export default UpdateTodo;

const styles = StyleSheet.create({
  addButton: {
    // position: 'absolute',
    // bottom: 20,
    // right: 20,
  },

  input: {
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: colors.gray100,
    padding: 30,
    fontSize: 18,
    lineHeight: 28,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'left',
    marginLeft: 10,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    // backgroundColor: colors.violet600,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    // color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
