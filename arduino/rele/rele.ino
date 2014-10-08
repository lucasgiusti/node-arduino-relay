#include <SPI.h>
#include <Ethernet.h>

byte mac[] = { 0x90, 0xA2, 0xDA, 0x00, 0x9B, 0x36 }; //physical mac address
byte ip[] = { 192, 168, 0, 177 }; // ip in lan
byte gateway[] = { 192, 168, 0, 1 }; // internet access via router
byte subnet[] = { 255, 255, 255, 0 }; //subnet mask
EthernetServer server(80); //server port

String readString;

int pin = 9; 

//////////////////////

void setup(){

  pinMode(pin, OUTPUT); //pin selected to control
  //start Ethernet
  Ethernet.begin(mac, ip, gateway, subnet);
  server.begin();
  //the pin for the servo co
  //enable serial data print
  Serial.begin(9600);
}

void loop(){
  // Create a client connection
  EthernetClient client = server.available();
  if (client) {  
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();

        //read char by char HTTP request
        if (readString.length() < 100) {
          //store characters to string
          readString += c;
        }

        //if HTTP request has ended
        if (c == '\n') {
          ///////////////////// control arduino pin
          
          if(readString.indexOf("?releOn") >0){//checks for on
            digitalWrite(pin, HIGH);    // set pin 4 high
            readString="";
          }
          else if(readString.indexOf("?releOff") >0){//checks for off
              digitalWrite(pin, LOW);    // set pin 4 low
          }
          //clearing string for next read
          readString="";  


          client.println("200");
          delay(1);
          //stopping client
          client.stop();
        }
      }
    }
  }
}

