import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, Button, View, TextInput } from 'react-native';

const Stack = createNativeStackNavigator(); // sets up the navigation manages navigation flow 

const HomeScreen = ({ navigation, route }) => { // homescreen componment navigation and route as props used to navigate to other screens 
  const { text } = route.params || {};
  
  const handleProfilePress = () => {
    navigation.navigate('Profile', { name: 'Jane' });
  };

  const handleThirdScreenPress = () => {
    navigation.navigate('Third');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to the Home Screen</Text>
      {text && <Text>You entered: {text}</Text>}
      <Button title="Go to Jane's Profile" onPress={handleProfilePress} />
      <Button title="Go to Third Screen" onPress={handleThirdScreenPress} />
    </View>
  );
};

const ProfileScreen = ({ navigation, route }) => { //componment navigation and route as props used to navigate to other screens 
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is {route.params.name}'s profile</Text>
    </View>
  );
};

const ThirdScreen = ({ navigation }) => {
  const [title, setTitle] = React.useState(''); // input title state
  const [price, setPrice] = React.useState(''); // input price state
  const [inputText, setInputText] = React.useState(''); // input text states
  const [quote, setQuote] = React.useState('');
  const handleButtonPress = async () => {
    try {
      const response = await fetch('https://6c7d-193-1-57-1.ngrok-free.app/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, price }),
      });
      if (response.ok) {
        alert('Product added successfully');
        setTitle('');
        setPrice('');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };
/*
  const handleButtonPress = () => {
    navigation.navigate('Home', { text: inputText }); // nadles button press and text input 
  };
  */
/*
  const fetchQuote = async () => { // fetching the random quote 
    try { // try and catch looks for errors
      const response = await fetch(' https://6c7d-193-1-57-1.ngrok-free.app', { // fetch get request to specific url url and end point (Add the url for ngrok here)//https://quotes15.p.rapidapi.com/quotes/random/
        method: 'GET',
        headers: {
          //'x-rapidapi-host': 'quotes15.p.rapidapi.com', // specifies the host 
          //'x-rapidapi-key': 'e3a30e8caemsh68d7c40a5ad8065p1387cajsn426d9b7b9db1', // specifies the key for the api
          //'accept': 'application/json'
        }
      });
      // if server does not send proper json there will be an error in the await response.json
      const data = await response.text(); // once the response is recieved it is converted to JSON using response.json()
      setQuote(data.content); // used to update the state variable 
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };
*/
const fetchQuote = async () => {
  try {
    const response = await fetch('https://6c7d-193-1-57-1.ngrok-free.app/products'); // Update the ngrok URL here
    const data = await response.json();
    console.log(JSON.stringify(data))
    setQuote(data); // Assuming data is an array of products
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
/*
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
        placeholder="Enter text"
        onChangeText={setInputText}
        value={inputText}
      />
      <Button
        title="Submit"
        onPress={handleButtonPress}
      />
      <Button
        title="Fetch Products"
        onPress={fetchQuote} // calls the fetch function 
      />
      {quote ? (
  <View>
    {quote.map((product, index) => (
      <View key={index}>
        <Text>{product.name}</Text>
        <Text>{product.price}</Text>
      </View>
          ))}
        </View>
      ) : (
        <Text>Press to fetch products</Text>
      )}
      <Button
        title="Go to Home Screen"
        onPress={() =>
          navigation.navigate('Home')
        }
      />
      <Button
        title="Go to Profile Screen"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Jane' })
        }
      />
    </View>
  );
};
*/
return (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <TextInput
      style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
      placeholder="Enter Title"
      onChangeText={setTitle}
      value={title}
    />
    <TextInput
      style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
      placeholder="Enter Price"
      onChangeText={setPrice}
      value={price}
    />
    <Button
      title="Submit"
      onPress={handleButtonPress}
    />
    <Button
      title="Fetch Products"
      onPress={fetchQuote} // calls the fetch function 
    />
    {quote ? (
      <View>
        {quote.map((product, index) => (
          <View key={index}>
            <Text>{product.name}</Text>
            <Text>{product.price}</Text>
          </View>
        ))}
      </View>
    ) : (
      <Text>Press to fetch products</Text>
    )}
    <Button
      title="Go to Home Screen"
      onPress={() =>
        navigation.navigate('Home')
      }
    />
    <Button
      title="Go to Profile Screen"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
  </View>
);
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Third" component={ThirdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
