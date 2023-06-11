# blackjack-server
Event driven BlackJack server using Node.js, ws.js to handle Websocks and zod for validation.

The server handles multiplayer BlackJack logic in real time. When it receives a request from the client, it validates the data and also checks game logic to ensure game integrity. This is to stop front end bugs from allowing invalid requests or bad actors from trying to cheat. 

The way the events are containerised and captured can be described as a tree. The server handles all data and events from the top level since it is the root. 

Following the server, we have a session. The server may have multiple sessions and does not handle anything under session, only outside. The session handles everything inside the session itself in the same light as the server. It handles pre-game logic and the lobby for which players connect to beore the game is started. 

Once the game is started, the game will have an instance that is referenced to by the session. This session will move all players into the game instance, and from there hte game will have 'started'. Each player can choose to 'hit', which means draw a card, or 'hold' which is to wait for eveyrone else to finish drawing or holding. Once a player holds the game will no longer allow them draw or change decision until the round ends. A round is when everyone is 'bust' or holds. THe person holding the highest value wins the round and there will be a vote for everyone to restart.

Summmary of the structure:
@types - globally used types
constants - globally used constants
entities - classes that are instantiated and have specifc purposes for data encapsulation, mainly used to divide responsibilities and represent containers and actors
enum - pretty much same as constants (compiled into objects from TS) with slight differences in how you access properties
eventHandlers - triaging event requests when they come into the server, the server checks the event and validates before passing down the payload to figure out which event to run
events - purely event logic, including the broadcast of data, and whether or not a client should be broadcasted to
payloads - data structures used by the client, this is where they are transformed
schema - validation and a truth of source for data structures to be received by the client
utils - business logic and generics and placed in here alongside common miscellaneous logic


