import React, {useState, useEffect} from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Platform
} from 'react-native';
import { Button } from '../../components/Button';
import { SkillCard } from '../../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export function Home(){

  const [newSkill , setNewSkill] = useState('');
  const [mySkills , setNewMySkills] = useState<SkillData[]>([]);
  const [gretting , setGretting] = useState('');

  function handleAddNewSkill(){
    if (newSkill === ''){
      return;
    }

    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setNewMySkills(oldState => [...oldState, data])
    setNewSkill('')
  }
  function handleDeleteSkill(id : string){
    setNewMySkills(oldState => oldState.filter(item =>
      item.id !== id))
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
        value={newSkill}
      />

      <Button
        title="Adicionar"
        onPress={handleAddNewSkill}
      />

      <Text 
        style={[styles.title, {marginVertical:30}]}
      >
        My Skills
      </Text>
      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({item})=> (
          <SkillCard 
            skill={item.name}
            onPress={
              () => handleDeleteSkill(item.id)
            }
          />
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
    paddingVertical: 40
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