import React, {useState, useEffect} from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList
} from 'react-native';
import { Button } from '../../components/Button';
import { SkillCard } from '../../components/SkillCard';

export function Home(){

  const [newSkill , setNewSkill] = useState('');
  const [mySkills , setNewMySkills] = useState([]);
  const [gretting , setGretting] = useState('');

  function handleAddNewSkill(){
    setNewMySkills(oldState => [...oldState, newSkill])
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if(currentHour < 12){
      setGretting('Good Morning');
    }else if(currentHour >= 12 && currentHour >= 18){
      setGretting('Good Afternoon');
    }else{
      setGretting('Good Night');
    }
  },[])

  return (
    <View style={styles.container}>
      <Text 
        style={styles.title}
      >
        Welcome, Danilo
      </Text>

      <Text 
        style={styles.title}
      >
        {gretting}
      </Text>

      <TextInput 
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button
        onPress={handleAddNewSkill}
      />

      <Text 
        style={[styles.title, {marginVertical:30}]}
      >
        My Skills
      </Text>
      <FlatList
        data={mySkills}
        keyExtractor={item=> item}
        renderItem={({item})=> (
          <SkillCard skill={item}/>
        )}
      />


     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 20,
    paddingVertical: 50
  },
  title:{
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold'
  },
  input:{
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
 
})