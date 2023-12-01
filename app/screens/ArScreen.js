import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroAnimations,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight
} from '@viro-community/react-viro';

// Create a new context
const TextContext = createContext();

const InitialScene = (props) => {
  const { text } = useContext(TextContext);
  let stat = props.sceneNavigator.viroAppProps;

  ViroAnimations.registerAnimations({
    rotate:{
      duration:2500,
      properties:{
        rotateY:'+=90'
      }
    }
  })

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff"/>
      {stat.isNotMsg == false ?
        <ViroText
          text={text}
          scale={[2.5, 2.5, 2.5]}
          position={[0, 0, -5]}
          style={styles.helloWorldTextStyle}
        />
      :
        /*<ViroBox
          height={2}
          length={2}
          width={2}
          scale={[0.2, 0.2, 0.2]}
          position={[0, -1, -1]}
          animation={{name:'rotate', loop:true, run:true}}
      />*/
      <Viro3DObject
        source={require('../assets/uploads-files-3874711-Envelope.obj')}
        position={[0, 0, -5]}
        rotation={[30,40,80]}
        scale={[0.01,0.01,0.01]}
        animation={{name:'rotate', loop:true, run:true}}
        type="OBJ"
      />
      }
    </ViroARScene>
  );
};

function ArScreen(props) {
  const [isNotMsg, setIsNotMsg] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
      setText(props.route.params.message);
  }, [props.route.params]);

  return (
    <TextContext.Provider value={{ text }}>
      <View style={styles.mainView}>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{
            scene: InitialScene,
          }}
          style={{ flex: 1 }}
          viroAppProps={{ "isNotMsg": isNotMsg }}
        />
        <View style={styles.container}>
          <Pressable
            onPress={() => props.navigation.navigate("Augmented Reality Validation")}
            style={styles.redirectButton}
          >
            <Text style={styles.redirectButtonText}>Head Back</Text>
          </Pressable>
          <Pressable
            style={styles.redirectButton}
            onPress={() => {
              setIsNotMsg(false);
            }}
          >
            <Text style={styles.redirectButtonText}>View Message</Text>
          </Pressable>
        </View>
      </View>
    </TextContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF9F4", // Updated background color
    display: 'flex',
    flexDirection: 'row'
  },
  redirectButton: {
    backgroundColor: "#6C3A2C", // Updated background color
    padding: 8, // Updated padding
    width: '50%',
    borderRadius: 10, // Updated border radius
    marginTop: 4,
    marginBottom: 4,
    marginRight: 8,
    marginLeft: 8,
  },
  redirectButtonText: {
    color: "#FCF9F4",
    textAlign: "center",
    fontSize: 14, // Updated font size
    fontFamily: "Avenir-Black", // Updated font
  },
  mainView: {
    flex:1
  }
});

export default ArScreen;