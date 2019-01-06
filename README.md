# MyGateCodingChallenge
This is for mygate coding challenge


Project Clone:
    
        git clone git@github.com:mouryavenkat/MyGateCodingChallenge.git

        Do 'npm install' 

Step-1 : You need to install mongoDB. Best way is skip installation process is to use  docker image of mongoDB. Run the following command.

        --> docker run --name mongoImage -d mongo:latest

        --> Now we need to link this mongoDB to our application. To do that we need the container Ip address. To get the container Ip address, do the following steps.

            ---> docker ps

            ---> Copy continer Id.

            ---> docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'  <<paste_container_id>>

            ---> In return to above command, you will receive a Ip address. Copy that.

Step-2 : Now that we have mongoDB up and running, We need to connect server to mongoDB. Hence export it as environment variable from where you re starting the server.

        ---> If you are using linux ( export hostIp= <Enter copied mongoDB Ip address> )

        ---> Assuming that you are in current directory, to start the server run a command ( node src/server/server.js)

        ---> If everything went well and mongo connection is established, the server will start on 8080 port


Step-3 : Now that we started our server, the only step is to start the client. To do that just enter ( npm start ). Do it other window without halting the server.

        If everything went good your client starts on port 3000. To open the application please enter 'http://localhost:3000/dashboard' in your browser. 

        There you go, you can now view the dashboard and perform operations on UI.


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Features: 

    1:)You can view all the Food Courts by default . 
    2:)If you want to view the food courts based on APPROVED OR REQUESTED STATUS, You can apply by selecting the filter on top right corner.
    3) Type ahead search with 1s delay.( If no user action for 1 second, then a search will be started inorder to reduce the load on the server)

        Type ahead search, the search can be on food court name or expiration date or street_name. This is a substring search

    4) You can add a new food court from the UI.

    API SUPPORT:
    ------------
        1:) To view the best restaurnt by location use the following api:

                http://localhost:8080/getFoodCourtsByLocation/?longitude=<userInput>&latitude=<userInput>&limit=<user_input>

                limit --> If nothing specified then by default it will return the top 1 best food truck.

                          If any integer value supplied, then it will return top limit matches in closest first order.

                latitude --> any value from [-90,90]

                longitude --> any value from [-180,180]
            
            Method:'GET'

        2:) To delete a specific foodcourt

                http://localhost:8080/deleteFoodCourt/:foodCourtId

                If foodCourt is present, then it will return {n:1,ok:1}.

                If specified food court is not present or is already deleted, it will return back a 404 http status code response.
            
            Method:'DELETE'

        3:) To upsert a specific food court.

                http://localhost:8080/updateFoodTruck 

                Method:'PUT',

                Body: The data with which you want to update the foodtruck. 

        4:) To Approve a foodtruck request.

                http://localhost:8080/approveRequest?requestId=<Object_Id_Of_FoodTruck>

                Method:'POST'

                body:{
                    'expirationdate':<ISO-FORMAT-DATE>
                }