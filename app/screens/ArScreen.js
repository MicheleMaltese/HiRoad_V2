import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Pressable, StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroBox,
  ViroAnimations,
  ViroARSceneNavigator,
  Viro3DObject
} from '@viro-community/react-viro';

const InitialScene = (props) => {
  let stat = props.sceneNavigator.viroAppProps;
  const [text, setText] = useState('Please give us an A, my GPA could use a boost!');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    /*if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('aaaaaa aaaaaa aaaaaaa');
    } else if (state === ViroTrackingStateConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }*/
  }

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
    {stat.isNotMsg == false ?
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
  />
:
      <ViroBox
        height={2}
        length={2}
        width={2}
        scale={[0.2,0.2,0.2]}
        position={[0, -1, -1]}
        animation={{name:'rotate', loop:true, run:true}}
        //onDrag={setText("Hello World")}
/>}

      {/*<Viro3DObject 
        source={require('../assets/models/Envelope/Envelope.glb')}
        position={[0, 0, -5]}
        scale={[0.05, 0.05, 0.05]}
        type={"GLB"}
        rotation={[-45, 50, 40]}
      />*/}
    </ViroARScene>
  );
};

function ArScreen(props) {
  const [isNotMsg, setIsNotMsg] = useState(true);

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: InitialScene,
        }}
        style={{flex:1}}
        viroAppProps={{"isNotMsg": isNotMsg}}
      />
      <View style={styles.container}>
        <Pressable
          onPress={() => props.navigation.navigate("Drawer")}
          //onPress={() => console.log("heyyyy")}
          style={styles.redirectButton}
        >
          <Text style={styles.redirectButtonText}>Head Back to Main Menu</Text>
        </Pressable>
        <Pressable
          style={styles.redirectButton}
          onPress={() => {
              setIsNotMsg(false);
            }}
          //onPress={() => console.log("heyyyy")}
        >
          <Text style={styles.redirectButtonText}>View a Secret Message</Text>
        </Pressable>
      </View>
    </View>
  );
};

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