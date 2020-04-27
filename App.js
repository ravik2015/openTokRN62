import React, {Component} from 'react';
import {View, NativeModules, Text, Dimensions} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';
import {Button} from 'react-native-paper';
const {width, height} = Dimensions.get('window');
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startCall: false,
      isConnected: false,
    };
    this.otSessionRef = React.createRef();
    this.sessionEventHandlers = {
      streamCreated: event => {
        console.log('Stream created!', event);
      },
      streamDestroyed: event => {
        console.log('Stream destroyed!', event);
      },
      sessionConnected: event => {
        console.log('event', event);
        this.setState({
          isConnected: true,
        });
      },
    };
    this.apiKey = '46647042';
    this.sessionId =
      '1_MX40NjY0NzA0Mn5-MTU4NTk5ODEzNzQ0MX5DdEkxZWU5S3h0QUt3RlBtcVFMaE1Jc3R-UH4';
    this.token =
      'T1==cGFydG5lcl9pZD00NjY0NzA0MiZzaWc9MGIzZDU5NTIxMDJmY2Y3YTFhYjM5MWFhZjA4M2UyZTUxOGNjYjRlYjpzZXNzaW9uX2lkPTFfTVg0ME5qWTBOekEwTW41LU1UVTROVGs1T0RFek56UTBNWDVEZEVreFpXVTVTM2gwUVV0M1JsQnRjVkZNYUUxSmMzUi1VSDQmY3JlYXRlX3RpbWU9MTU4NjAwMjE5OSZub25jZT0wLjUxODIxMzYwNDQ2MjU0NiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTg4NTk0MTk3JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
  }
  startCall = () => {
    this.setState({startCall: true});
    NativeModules.OTSessionManager.connect(this.sessionId, this.token, res => {
      console.log(res, 'call start response');
    });
  };
  endCall = () => {
    this.setState({startCall: false});
    NativeModules.OTSessionManager.disconnectSession(
      this.sessionId,
      Reponse => {
        console.log(Reponse, 'call end response');
      },
    );
  };
  render() {
    const {startCall} = this.state;
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            flexDirection: 'row',
          }}>
          {/* START CALL */}
          <Button onPress={() => this.startCall()}>Start Call</Button>
          <View style={{flex: 0.2}} />
          {/* END CALL */}
          <Button onPress={() => this.endCall()}>End Call</Button>
        </View>
        {startCall && (
          <View style={{flex: 0.4}}>
            <OTSession
              apiKey={this.apiKey}
              sessionId={this.sessionId}
              token={this.token}
              eventHandlers={this.sessionEventHandlers}
              ref={this.otSessionRef}>
              <View
                style={{
                  width: width,
                  height: height,
                  backgroundColor: 'gray',
                }}>
                <OTSubscriber style={{width: width, height: height}} />
              </View>
              <OTPublisher
                style={{
                  width: 150,
                  height: 200,
                  backgroundColor: 'yellow',
                  position: 'absolute',
                  top: 24,
                  left: 24,
                }}
              />
            </OTSession>
          </View>
        )}
      </View>
    );
  }
}
