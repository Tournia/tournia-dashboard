/**Upcoming matches table**/
function getUpcomingMatchesTable(){
	log("making upcoming matches table...")
	UMTableCount +=1
	try{
		my_upcomingMatchesTable.destroy()
	} catch (err){
	}
		my_OffsetTop = $("#upcomingMatchesTable").offset().top
		UnlistedMatchCount += 0
		my_UMRows = []
		//allUMdata = []
		
		 inTotCount_UM = 0
		 totUnavailable_UM = 0
				
		 inCount_UM = []
		 inReadyCount_UM = []
		 inPlayCount_UM = []
		 unavailable_UM = []
         freeCourtsAtStartCount = 0
         Playing = false
		
		 inFirstCount_UM = 0
		 inSecondCount_UM = 0
		 expectedTimesArray = []
		 predictedTimesArray = []
		 totalTimesArray = []
		 playersPlayingExpectedTimesArray = []
		 smallestExpectedTimesArray = []
		 shiftStartTime = 0
		 upcomingMatchInfoObjectsShift = []
		 shift1upcomingMatchInfoObjects = []
         shift1ppUpcomingMatchInfoObjects = []
         tempshift1ppUpcomingMatchInfoObjects = []
         ppUpcomingMatchInfoObjects = []
		 rtpUpcomingMatchInfoObjects = []
		 addIndex = 0
		 shift1ppCount = 0
		 altshift2count = 0
		 altshift2ppCount = 0
		 shift1rtp = 0
		 shift1pp = 0
		 nrOfCourts = availableLocationsCount
		 freeCourtsAvailable = 0
         assignedFreeCourts = 0
        
		var UM_loopStartLog = []
		var UM_loopStopLog = []
		if(firstLoad === true){
			arraycount = 1
			firstLoad = false
		} else {
			//////log("after first", typeof arraycount)
			arraycount += 1
			mycurrentLocalIDArray = []
		}
		var mycurrentLocalIDArray = []
		var my_currentStringsArray = []
		var my_intermediatArray = []
		var my_currentStringObjectsArray = []
		var allStartArrays = []
		
		for(pt = 0; pt < predictedTimeLeftArray.length; pt++){
			if(predictedTimeLeftArray[pt].timeLeft === 0){
                freeCourtsAvailable += 1
                 
			}
		}
		////////log("available nr. of courts:", nrOfCourts)
		//////log("available nr. of free courts:", freeCourtsAvailable)
		
		var UM_playerNamesCurrentlyPlayingArray = []
		var UM_playerNamesCurrentlyPlayingArray_ET = []
		var UM_playerNamesCurrentlyUnavailableArray = []
		var UM_playerNamesReadyToPlayArray = []
		
		////log(my_upcomingMatches)
		if(noUpcomingMatches === true){
			 
		}
		
		for (var um = 0; um < my_upcomingMatches.length; um++){
			//////log("processing new match..",  my_upcomingMatches.length)
			var singleUMData = {}
			var statusPlayers = [];
			var playerNamesCurrentlyPlayinginMatchArray = []
			var playersPlayingObects = []
			var predictedTimeLeftofPlayingPlayersArray = []
			var my_UMrowNumber = um + 1
			var my_PoolName = my_upcomingMatches[um].pool
				
				
			var poolPropertiesObject = findPoolProperties(my_PoolName)
			singleUMData.poolProperties = poolPropertiesObject
				
			if(poolPropertiesObject.altNames[0] === "Average Pool"){
				var abbrPoolName = my_PoolName
			} else {
				var abbrPoolName = poolPropertiesObject.abbreviations[0]
			}
				
			//var abbrPoolName = getPoolNameAbbr(my_PoolName)
				
			var UMrow_id = "UMrow-" + my_UMrowNumber
			//tri = $('<tr id=' + UMrow_id + '/>');
			// um nr
			//tri.append("<td class='vsColumn'>" + my_UMrowNumber + "</td>")
			singleUMData.UMNr = my_UMrowNumber
			singleUMData.matchNr = my_upcomingMatches[um].localId
				
			if(ifMobile === false){
				singleUMData.poolName = my_PoolName 
			} else {
				singleUMData.poolName = abbrPoolName 
			}
			singleUMData.abbrPoolName = abbrPoolName
			//tri.append("<td>" + my_upcomingMatches[um].localId + "</td>");
			//////////log("processing first team...")
				
			//Get Status players functions
				
			/*function getPlayingStatus(playerName, secondTd){
				var TdInput = "<td class='playerColumn'"+ playerPlayingSpan + playerName + "</span></td>"+secondTd
				var playerStatus = "Player playing"
				statusPlayers.push(playerStatus)	
					return TdInput
			}
			function getStatusNonReady(playerName, secondTd){
				var TdInput = playerName + secondTd
				var playerStatus = "Player not ready"
				statusPlayers.push(playerStatus)
					return TdInput
			}
			function getReadyToStartStatus(playerName, secondTd){
				var TdInput = "<td class='playerColumn'>" + playerName + secondTd
				var playerStatus = "Ready to start"
				statusPlayers.push(playerStatus)	
					return TdInput
			}*/
				
			//Put status in Table
			


			function getStatus(fullPlayerName, playerName, amountPlayers, playerCurrentlyPlaying, playerReady, TdInput, playerStatus){
						if(playerCurrentlyPlaying === true){
							playerNamesCurrentlyPlayinginMatchArray.push(playerName)
							UM_playerNamesCurrentlyPlayingArray.push(playerName);
							UM_playerNamesCurrentlyPlayingArray_ET.push(fullPlayerName)
							removeStringFromArray(UM_playerNamesCurrentlyUnavailableArray, playerName);
							removeStringFromArray(UM_playerNamesReadyToPlayArray, playerName);
							var playerStatus = "player playing"
							statusPlayers.push(playerStatus)	
								return playerName
						} else {
							if(playerReady === false){
								UM_playerNamesCurrentlyUnavailableArray.push(playerName)	
								removeStringFromArray(UM_playerNamesReadyToPlayArray, playerName);
								removeStringFromArray(UM_playerNamesCurrentlyPlayingArray, playerName);
								removeStringFromArray(UM_playerNamesCurrentlyPlayingArray_ET, fullPlayerName)
								var playerStatus = "player not ready"
								//my_postponedPlayers.push(fullPlayerName)
								statusPlayers.push(playerStatus)
									return playerName
							} else {
								UM_playerNamesReadyToPlayArray.push(playerName);
								removeStringFromArray(UM_playerNamesCurrentlyPlayingArray, playerName);
								removeStringFromArray(UM_playerNamesCurrentlyUnavailableArray, playerName);
								removeStringFromArray(UM_playerNamesCurrentlyPlayingArray_ET, fullPlayerName);
								var playerStatus = "ready to start"
								statusPlayers.push(playerStatus)
									return playerName
							}
						}

			}
			//Name Team 1 column
			var my_T1count = 0
				
			for (var t1 = 0; t1 < my_upcomingMatches[um].team1.players.length; t1++){
					my_T1count +=1
					var playerNickNameTeam1 = my_upcomingMatches[um].team1.players[t1].name
					var playerNameTeam1 = playerNickNameTeam1.replace(/".*"/, "").replace("  ", " ").replace("  ", " ").replace("  ", " ")
					var t1PlayerCurrentlyPlaying = my_upcomingMatches[um].team1.players[t1].currentlyPlaying
					//////////log(playerNameTeam1, "playing:", t1PlayerCurrentlyPlaying)
					var t1PlayerReady = my_upcomingMatches[um].team1.players[t1].ready
					//////////log(playerNameTeam1, "ready:", t1PlayerReady)
					var amountT1Players = my_upcomingMatches[um].team1.players.length
					var Td1Input, t1PlayerStatus
					var simplePlayerName_1 = getStatus(playerNickNameTeam1, playerNameTeam1, amountT1Players, t1PlayerCurrentlyPlaying, t1PlayerReady, Td1Input, t1PlayerStatus)
					var fullPlayerName_1 = playerNameTeam1

				//tri.append(simplePlayerName_1)
				if(my_upcomingMatches[um].team1.players.length === 1){
					singleUMData.teamOne1 = simplePlayerName_1;
					singleUMData.teamOne1FN = fullPlayerName_1;
					singleUMData.teamOne2 = "";
					singleUMData.teamOne2FN = "";
				} else if(my_upcomingMatches[um].team1.players.length > 1 && my_T1count === 1){
					singleUMData.teamOne1 = simplePlayerName_1
					singleUMData.teamOne2FN = fullPlayerName_1;
				} else if (my_upcomingMatches[um].team1.players.length > 1 && my_T1count === 2) {
					singleUMData.teamOne2 = simplePlayerName_1
					singleUMData.teamOne2FN = fullPlayerName_1;
				} else if (my_upcomingMatches[um].team1.name === "-") {
					singleUMData.teamOne1 = "-"
					singleUMData.teamOne1FN = "";
					singleUMData.teamOne2 = ""
					singleUMData.teamOne2FN = "";
				}
			}
			if(my_upcomingMatches[um].team1.players.length === 0){
				simplePlayerName_1 = "-"
				fullPlayerName_1 = "-"
				singleUMData.teamOne1 = "-"
				singleUMData.teamOne1FN = "-"
				singleUMData.teamOne2 = ""
				singleUMData.teamOne2FN = "-"

			}
			//vs column
			//tri.append("<td class='vsColumn'>" + "<b>vs.</b>" + "</td>");
			singleUMData.vsColumn = "vs."
				
			//Name Team 2 Column
			var my_T2count = 0
			for (var t2 = 0; t2 < my_upcomingMatches[um].team2.players.length; t2++){
					my_T2count +=1
					var playerNickNameTeam2 = my_upcomingMatches[um].team2.players[t2].name
					var playerNameTeam2 = playerNickNameTeam2.replace(/".*"/, "").replace("  ", " ").replace("  ", " ")
					var t2PlayerCurrentlyPlaying = my_upcomingMatches[um].team2.players[t2].currentlyPlaying
					//////////log(playerNameTeam2, "playing:", t2PlayerCurrentlyPlaying)
					var t2PlayerReady = my_upcomingMatches[um].team2.players[t2].ready
					//////////log(playerNameTeam2, "ready:", t2PlayerReady)
					var amountT2Players = my_upcomingMatches[um].team2.players.length
					var Td2Input, t2PlayerStatus
					var simplePlayerName_2 = getStatus(playerNickNameTeam2, playerNameTeam2, amountT2Players, t2PlayerCurrentlyPlaying, t2PlayerReady, Td2Input, t2PlayerStatus)
				var fullPlayerName_2 = playerNickNameTeam2

					if (my_upcomingMatches[um].team2.name === "-") {
						log("empty")
						simplePlayerName_2 = ""
					}
				//tri.append(simplePlayerName_2);
				if(my_upcomingMatches[um].team2.players.length === 1){
					singleUMData.teamTwo1 = simplePlayerName_2;
					singleUMData.teamTwo1FN = fullPlayerName_2;
					singleUMData.teamTwo2 = ""
					singleUMData.teamTwo2FN = ""
				} else if(my_upcomingMatches[um].team2.players.length > 1 && my_T2count === 1){
					singleUMData.teamTwo1 = simplePlayerName_2
					singleUMData.teamTwo1FN = fullPlayerName_2
				} else if (my_upcomingMatches[um].team2.players.length > 1 && my_T2count === 2) {
					singleUMData.teamTwo2 = simplePlayerName_2;
					singleUMData.teamTwo2FN = fullPlayerName_2
				} else if(my_upcomingMatches[um].team2.name === "-"){
					singleUMData.teamTwo1 = "-"
					singleUMData.teamTwo1FN = "-"
					singleUMData.teamTwo2 = ""
					singleUMData.teamTwo2FN = ""
				}
			}
			if(my_upcomingMatches[um].team2.players.length === 0){
				simplePlayerName_2 = "-"
				fullPlayerName_2 = "-"
				singleUMData.teamTwo1 = "-"
				singleUMData.teamTwo1FN = "-"
				singleUMData.teamTwo1 = "-"
				singleUMData.teamTwo1FN = "-"
			}
				
			//Status column
			singleUMData.priority = my_upcomingMatches[um].priority
			var playersPlaying = inArray("player playing", statusPlayers)
			var playersNotReady = inArray("player not ready", statusPlayers)
				if (playersNotReady === true){
					singleUMData.unavailablePlayers = true;
					singleUMData.playersPlaying = false;
					singleUMData.readyToPlay = false;
					var my_statusText = playersUnavailable
					var my_status = my_statusText
					//////////log("unavailable:", my_status)
				} else if (playersPlaying === true){
					singleUMData.unavailablePlayers = false;
					singleUMData.playersPlaying = true;
					singleUMData.readyToPlay = false;
					var my_statusText = playersCurrentlyPlaying
					var my_status = my_statusText
				} else {
					singleUMData.unavailablePlayers = false;
					singleUMData.playersPlaying = false;
					singleUMData.readyToPlay = true;
					var my_statusText = readyToPlay
					var my_status = my_statusText
					//////////log("ready:", my_status)
				}
			singleUMData.status = my_status
				
			/*if(showStatusPlayersColumn === true){
				//tri.append("<td class='statusColumn'" + my_status + "</td>");
				singleUMData.status = my_status
			} else {
				document.getElementById("playerStatusColumn").style.display = "none"
			}*/
				
			//expected Times column
            singleUMData.noExpectedTime = "";
            if (showExpectedTimeColumn === true) {
                var ET_returns = calculateExpectedTime(um, my_PoolName, poolPropertiesObject, singleUMData, nrOfCourts, my_statusText, playersNotReady, playersPlaying, UM_playerNamesCurrentlyPlayingArray_ET, playersPlayingObects, predictedTimeLeftofPlayingPlayersArray)

                log("ET returns:", ET_returns)
                var upcomingMatchInfo = ET_returns[0]
                singleUMData = ET_returns[1]
            } else {
                singleUMData.shiftNrExpectedTimeMinsStdDev = ""
                singleUMData.shiftNrExpectedTimeSecs = ""
                singleUMData.StdDevExpectedTime = ""
                singleUMData.namedExpectedTime = ""
            }
            allUMdata.push(singleUMData)

		
			//check expected Times
			//start log
			if (showExpectedTimeColumn === true && sendingDataToDatabase === true) {
				var my_currentStartSingleStringsObject = {}
				var my_startArray = []
				var my_stopArray = []
				//if(my_settingsVarsObject.showExpectedTimeColumn === true){
				var start = "start"
				var my_matchLocalId = my_upcomingMatches[um].localId
				var processIDS = start + my_matchLocalId.toString()
				var processIDI = ""
				var tournamentName = my_tournamentName

				my_currentStartSingleStringsObject.tournamentName = tournamentName
				my_currentStartSingleStringsObject.matchId = my_matchLocalId
				my_currentStartSingleStringsObject.status = start
				my_currentStartSingleStringsObject.processID = processIDS
				my_currentStartSingleStringsObject.dataReloadCount = reloadDataCount
				my_currentStartSingleStringsObject.timeSinceLastRefresh = lastRefreshTimeLog

				var myPoolname = my_upcomingMatches[um].pool
				my_currentStartSingleStringsObject.pool = myPoolname

				upcomingMatchInfo.localId = my_matchLocalId
				var jsCurrentTimeS = new Date()
				my_currentStartSingleStringsObject.jsDate = jsCurrentTimeS
				var isoCurrentTimeS = jsToisoDate(jsCurrentTimeS)
				my_currentStartSingleStringsObject.isoDate = isoCurrentTimeS

				var firstExpectedTime = singleUMData.expectedTimeSecs //not upcomingMatchInfo object because singleUMData objects includes all numbers als oif unavailable or free court.
				my_currentStartSingleStringsObject.expectedTime = firstExpectedTime

				var ifReadytoPlayS = upcomingMatchInfo.readyToPlay
				my_currentStartSingleStringsObject.ifReadytoPlay = ifReadytoPlayS

				var ifPlayerPlayingS = upcomingMatchInfo.playersPlaying
				my_currentStartSingleStringsObject.ifPlayerPlaying = ifPlayerPlayingS

				var ifUnavailableS = upcomingMatchInfo.playersUnavailable
				my_currentStartSingleStringsObject.ifUnavailable = ifUnavailableS

				var expectedTimestartTimeDifferenceS = null
				var timeDifferenceSecsS = null
				my_currentStartSingleStringsObject.expectedTimeDifference = expectedTimestartTimeDifferenceS
				my_currentStartSingleStringsObject.timeDifferenceSecs = timeDifferenceSecsS

				my_currentStartSingleStringsObject.reloadDataTimeInterval = reloadDataTimeSecs
				if (ifUnavailableS === false) {
					my_startArray.push(/*tournament_ID,*/tournamentName, reloadDataCount, processIDS, start, my_matchLocalId, myPoolname, isoCurrentTimeS, firstExpectedTime, ifReadytoPlayS, ifPlayerPlayingS, ifUnavailableS, reloadDataTimeSecs, lastRefreshTimeLog, expectedTimestartTimeDifferenceS, timeDifferenceSecsS)

					my_currentStringObjectsArray.push(my_currentStartSingleStringsObject)
					mycurrentLocalIDArray.push(my_matchLocalId)
					//////log(mycurrentLocalIDArray[arraycount])
					mycurrentLocalIDArray.sort(function (a, b) { return a - b })
				}

				my_startInputString = my_startArray.join(";")
				//////log(my_startInputString) 
				var inStartArray = inArray(my_matchLocalId, completeMatchIDArray)

				//////log(upcomingMatchInfo)
				if (inStartArray === false && ifUnavailableS === false) {
					mycurrentLocalIDArray.push(my_matchLocalId)
					completeMatchIDArray.push(my_matchLocalId)
					mycurrentLocalIDArray.sort(function (a, b) { return a - b })
					completeMatchIDArray.sort(function (a, b) { return a - b })


					completeStartObjects.push(my_currentStartSingleStringsObject)
					completeStartArray.push(my_startArray)
					my_currentStringsArray.push(my_startInputString)

					//my_currentStringsArray.push(my_startInputString)

					var my_Startinput = my_startInputString + ";"

					/* */ /** INPUT VALUE **/ /* */
					//log(my_currentStartSingleStringsObject)
					//log(my_startArray)
					//log(my_startInputString)

					//objects
					//UM_startLog.push(my_currentStartSingleStringsObject)
					//UM_loopStartLog.push(my_currentStartSingleStringsObject)
					//arrays
					//UM_startLog.push(my_startArray)
					//UM_loopStartLog.push(my_startArray)
					//strings
					UM_startLog.push(my_startInputString)
					UM_loopStartLog.push(my_startInputString)
				}
				var ifAlreadyinStartLog = inArray(my_matchLocalId, completeMatchIDArray)
				my_intermediatArray = []
				if (ifAlreadyinStartLog === true && ifUnavailableS === false && (um === 5 || um === 10 || um === 15 || um === 20 || um === 25 || um === 30 || um === 35 || um === 40 || um === 45 || um === 50) || um === 55 || um === 60) {
					//log("intermediate:", um)
					var umNrStr = um.toString()
					processIDI = "umNr" + umNrStr + "_" + my_matchLocalId
					my_intermediatArray.push(/*tournament_ID,*/ tournamentName, reloadDataCount, processIDI, "intermediate", my_matchLocalId, myPoolname, isoCurrentTimeS, firstExpectedTime, ifReadytoPlayS, ifPlayerPlayingS, ifUnavailableS, reloadDataTimeSecs, lastRefreshTimeLog, expectedTimestartTimeDifferenceS, timeDifferenceSecsS)
					var my_intermediatString = my_intermediatArray.join(";")
					//log(my_intermediatString)
					my_currentStringsArray.push(my_intermediatString)
					//log("new all strings", my_currentStringsArray)
					UM_startLog.push(my_intermediatString)
					UM_loopStartLog.push(my_intermediatString)
					//log(UM_loopStartLog)
				}

				if (allUpcomingMatchInfoObjects.length === 0) {
					allUpcomingMatchInfoObjects.push(upcomingMatchInfo)
				} else {
					var found = false;
					for (var umo = 0; umo < allUpcomingMatchInfoObjects.length; umo++) {
						if (allUpcomingMatchInfoObjects[umo].localId === my_matchLocalId) {
							found = true;
							break;
						}
					}
					if (found === false) {
						allUpcomingMatchInfoObjects.push(upcomingMatchInfo)
					}

					var nextum = um + 1
					if (nextum === my_upcomingMatches.length) {
						window['load' + arraycount] = mycurrentLocalIDArray
						window['StringArray' + arraycount] = my_currentStringsArray
					}
				}
			}
		} /* */ /** end of for loop **/ /* */

		log("CP:", UM_playerNamesCurrentlyPlayingArray);
		log("RTP:", UM_playerNamesReadyToPlayArray);
		//adjust ExpectedTime
		
		if(showExpectedTimeColumn === true && AET === true){
			try{
				var adjustedExpectedTimes = adjustExpectedTimes(allUpcomingMatchInfoObjects,allUMdata)
				allUMdata = adjustedExpectedTimes[1]
			} catch(err){
				log(err)
			}
		}	
		//append Table
		////log("allUMdata", allUMdata)
		var UMremakeCount = 0
		var my_lengthMenu = lengthMenu(false, allUMdata) //create whole table
		//////log(my_lengthMenu)
		function makeNoUpcomingMatchesTable(my_data, ifPaging, lengthMenu){
				var tableInfoLocations = setTableInfoLocations(ifOrganizerViewPreset);
				/*if (showExpectedTimeColumn === false) {
					var my_NoExpectedTimeColumnName = expectedTimeColumnName(0);
				} else {
					var my_NoExpectedTimeColumnName = expectedTimeColumnName(0); //set expected time column name
				}*/
				var my_noUMTable = $('#upcomingMatchesTable').DataTable({
					data: my_data,
					paging: ifPaging,
					pagingType: "numbers",
					lengthChange: ifLengthChange(),
					searching: ifOrganizerViewPreset,
					lengthMenu:	lengthMenu,
					ordering: false,
					responsive: false,
					dom: tableInfoLocations,
					//pageResize: true,
					//bAutoWidth: false,			
					columns: [
						{ data: 'localId', autoWidth: false, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('text-align', 'center')
															},
						visible: expectedTimesDataTesting },
						{ data: 'poolName', function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('-webkit-column-span', 'all')
																	$(nTd).css('column-span', 'all')
																}
						},
						{ data: 'teamOne1' },
						{ data: 'teamOne2' },
						{ data: 'vsColumn' }, 
						{ data: 'teamTwo1' }, 										
						{ data: 'teamTwo2' },
						{ data: 'status', visible: showStatusPlayersColumn },
						{ data: my_expectedTimeColumnName, visible: showExpectedTimeColumn }
					],
				})
			return my_noUMTable}	
		
		function makeUpcomingMatchesTable(my_data, ifPaging, lengthMenu){
				//////log("making table", remakeCount, my_data, "lm:", lengthMenu)
				var tableInfoLocations = setTableInfoLocations(ifOrganizerViewPreset);
				/*if (showExpectedTimeColumn === false) {
					var my_expectedTimeColumnName = expectedTimeColumnName(0);
				} else {
					var my_expectedTimeColumnName = expectedTimeColumnName(0); //set expected time column name
				}*/

				var my_UMTable = $('#upcomingMatchesTable').DataTable({
					data: my_data,
					paging: ifPaging,
					pagingType: "numbers",
					lengthChange: ifLengthChange(),
					searching: ifOrganizerViewPreset,
					lengthMenu:	lengthMenu,
					ordering: false,
					responsive: false,
					dom: tableInfoLocations,
					error: 	function (xhr, error, thrown) {
								alert(xhr, error, thrown)
							},
					//pageResize: true,
					//bAutoWidth: false,			
					columns: [
						{ data: 'UMNr', autoWidth: false, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('text-align', 'center')
															},
						visible: expectedTimesDataTesting },
						{ data: 'poolName', fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol) {
																//$(nTd).css('border-left', '0.2vw solid #555555')
																$(nTd).css('border-left', '3px solid #555555')
																$(nTd).css('border-right', '0.2vw solid #555555')
																$(nTd).css('background-color', '#b3ccff')
																$(nTd).css('padding-left', '5px')
																$(nTd).css('padding-right', '5px')
																$(nTd).css('padding-top', '5px')
																$(nTd).css('padding-bottom', '5px')
															}
						},
						{ data: 'teamOne1', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-left', '5px')
																$(nTd).css('text-align', 'left')
																//log(sData, oData)
																

																var inRTP = false;
																var inPl = false;
																var inUnav = false;
																var inRTP = getNewStatus("UM", "RTP", sData, oData)//inArray(sData, UM_playerNamesReadyToPlayArray)
																if (inRTP === false) {
																	inPl = getNewStatus("UM", "PP", sData, oData)//inArray(sData, UM_playerNamesCurrentlyPlayingArray)
																	if (inPl === false && inPl === false) {
																		inUnav = getNewStatus("UM", "Unav", sData, oData)//inArray(sData, UM_playerNamesCurrentlyUnavailableArray)
																	}
																}																var testArray = [];
																
																if (inRTP === true) {
																	//log("ready to play css", nTd)
																	$(nTd).css('background-color', 'transparent')
																} else if (inPl === true){
																	//log("playing css", nTd);
																	$(nTd).css('background-color', '#ffffb3')
																} else if (inUnav === true) {
																	$(nTd).css('background-color', '#ff8080')
																} else {
																	$(nTd).css('background-color', 'transparent')
																}
															}
														
						},
						{ data: 'teamOne2', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-left', '5px')
																$(nTd).css('text-align', 'left')
																//////log(sData)
																var inRTP = false;
																var inPl = false;
																var inUnav = false;
																var inRTP = getNewStatus("UM", "RTP", sData, oData)//inArray(sData, UM_playerNamesReadyToPlayArray)
																if (inRTP === false) {
																	inPl = getNewStatus("UM", "PP", sData, oData)//inArray(sData, UM_playerNamesCurrentlyPlayingArray)
																	if (inPl === false && inPl === false) {
																		inUnav = getNewStatus("UM", "Unav", sData, oData)//inArray(sData, UM_playerNamesCurrentlyUnavailableArray)
																	}
																}																var testArray = [];
																
																if (inRTP === true) {
																	//log("ready to play css", nTd)
																	$(nTd).css('background-color', 'transparent')
																} else if (inPl === true) {
																	//log("playing css", nTd);
																	$(nTd).css('background-color', '#ffffb3')
																} else if (inUnav === true) {
																	$(nTd).css('background-color', '#ff8080')
																} else {
																	$(nTd).css('background-color', 'transparent')
																}
															}											
						},
						{ data: 'vsColumn', sWidth: '10px', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
																	$(nTd).css('font-weight', 'bold')
															}
						},
						{ data: 'teamTwo1', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-left', '5px')
																$(nTd).css('text-align', 'left')
																//////log(sData)
																//log("rtp", UM_playerNamesReadyToPlayArray, "pp", UM_playerNamesCurrentlyPlayingArray, UM_playerNamesCurrentlyUnavailableArray)
																var inRTP = false;
																var inPl = false;
																var inUnav = false;
																var inRTP = getNewStatus("UM", "RTP", sData, oData)//inArray(sData, UM_playerNamesReadyToPlayArray)
																if (inRTP === false) {
																	inPl = getNewStatus("UM", "PP", sData, oData)//inArray(sData, UM_playerNamesCurrentlyPlayingArray)
																	if (inPl === false && inPl === false) {
																		inUnav = getNewStatus("UM", "Unav", sData, oData)//inArray(sData, UM_playerNamesCurrentlyUnavailableArray)
																	}
																}
																
																if (inRTP === true) {
																	//log("ready to play css", nTd)
																	$(nTd).css('background-color', 'transparent')
																} else if (inPl === true) {
																	//log("playing css", nTd);
																	$(nTd).css('background-color', '#ffffb3')
																} else if (inUnav === true) {
																	$(nTd).css('background-color', '#ff8080')
																} else {
																	$(nTd).css('background-color', 'transparent')
																}
															}												
						},
						{ data: 'teamTwo2', fnCreatedCell:  function (nTd, sData, oData, iRow, iCol) {
																$(nTd).css('padding-left', '5px')
																$(nTd).css('text-align', 'left')
																//////log(sData)
																//////log("arrays:", UM_playerNamesReadyToPlayArray, UM_playerNamesCurrentlyPlayingArray, UM_playerNamesCurrentlyUnavailableArray)
																var inRTP = false;
																var inPl = false;
																var inUnav = false;
																var inRTP = getNewStatus("UM", "RTP", sData, oData)//inArray(sData, UM_playerNamesReadyToPlayArray)
																if (inRTP === false) {
																	inPl = getNewStatus("UM", "PP", sData, oData)//inArray(sData, UM_playerNamesCurrentlyPlayingArray)
																	if (inPl === false && inPl === false) {
																		inUnav = getNewStatus("UM", "Unav", sData, oData)//inArray(sData, UM_playerNamesCurrentlyUnavailableArray)
																	}
																}

																if (inRTP === true) {
																	//log("ready to play css", nTd)
																	$(nTd).css('background-color', 'transparent')
																} else if (inPl === true) {
																	//log("playing css", nTd);
																	$(nTd).css('background-color', '#ffffb3')
																} else if (inUnav === true) {
																	$(nTd).css('background-color', '#ff8080')
																} else {
																	$(nTd).css('background-color', 'transparent')
																}
															},												
						},
						{ data: 'status', sWidth: '80px', fnCreatedCell:	function (nTd, sData, oData, iRow, iCol) {
																
																	$(nTd).css('border-left', '0.2vw solid #555555')
																if (showExpectedTimeColumn === false) {
																	$(nTd).css('border-right', '3px solid #555555')
																} 
																if(sData === "priority match" && oData.readyToPlay === true){
																	$(nTd).css('font-weight', 'bold')
																	$(nTd).css('font-style', 'italic')
																	$(nTd).css('background-color', '#71da71')
																} else if(sData === "priority match" && oData.playersPlaying === true){
																	$(nTd).css('font-weight', 'bold')
																	$(nTd).css('font-style', 'italic')
																	$(nTd).css('background-color', '#ffffb3')
																} else if(sData === "priority match" && oData.unavailablePlayers === true){
																	$(nTd).css('font-weight', 'bold')
																	$(nTd).css('font-style', 'italic')
																	$(nTd).css('background-color', '#ff8080')
																} else if (sData === readyToPlay) {
																	$(nTd).css('background-color', '#71da71')
																} else if (sData === playersCurrentlyPlaying ) {
																	$(nTd).css('background-color', '#ffffb3')
																} else if (sData === playersUnavailable ) {
																	$(nTd).css('background-color', '#ff8080')
																}
															},											
						visible: showStatusPlayersColumn },
						{ data: my_expectedTimeColumnName /*'shiftNrExpectedTimeMinsStdDev'/*'shiftNrExpectedTimeSecs''StdDevExpectedTime''namedExpectedTimeMins'*/, fnCreatedCell: 	function (nTd, sData, oData, iRow, iCol){
																			$(nTd).css('border-right', '3px solid #555555')

																			//$(nTd).css('width', '60px')
																		},
						visible: showExpectedTimeColumn }
					],
				})
			return my_UMTable }
			
		if(noUpcomingMatches === true){
			//log("no UM")
			my_upcomingMatchesTable = makeNoUpcomingMatchesTable(allUMdata, ifPaging, my_lengthMenu)
			document.getElementById("UM_notes").style = "display: none";
		} else {
						
			//try {
				my_upcomingMatchesTable = makeUpcomingMatchesTable(allUMdata, ifPaging, my_lengthMenu)
			/*} catch (err) {
				log(err)
			}*/
		}
		//paging		
		if(ifPaging === true){
			function resizeUMTable(){	
				log("resizing UM")
				var countUMRows = paginationConfig('upcomingMatchesTable')
				////log("countUMRows", countUMRows)
				my_upcomingMatchesTable.destroy()
				//////log("UM table destroyed")
				
				var my_newLengthMenu = lengthMenu(true, allUMdata, countUMRows)
				if(noUpcomingMatches === true){
					my_upcomingMatchesTable = makeNoUpcomingMatchesTable(allUMdata, ifPaging, my_newLengthMenu)
				} else {
					//log("newLengthMenu", my_newLengthMenu)
					try{
						my_upcomingMatchesTable = makeUpcomingMatchesTable(allUMdata, ifPaging, my_newLengthMenu)					
					} catch (err){log(err)}
				}
				
				var my_UMDiv = document.getElementById('upcomingmatches-tab-content')
				var my_UMDivHeight = my_UMDiv.offsetHeight	
				function checkOverflow(table, allUMdata, ifPaging, origRowscount, my_newLengthMenu, my_tableHeight, pageCount){
					//log("overflowcount UM:", UMremakeCount)
					var my_UMDiv = document.getElementById('upcomingmatches-tab-content')
					var my_UMDivHeight = my_UMDiv.offsetHeight
					selectedUMTable = 1
					if(my_UMDivHeight>= (availableUMTableHeight + my_paginationNavHeight + my_UMnotesHeight)) {
						////log("overflow found in UM", my_UMDivHeight, availableUMTableHeight, UMremakeCount)
						table.destroy()
						UMremakeCount += 1
						var newRowsCount = origRowscount - UMremakeCount
						//////log("UM table destroyed", UMremakeCount, origRowscount, newRowsCount)
						//////log("newRowsCount", newRowsCount)
						var my_newnewLengthMenu = lengthMenu(true, allUMdata, newRowsCount)
						UMPageCount = Math.ceil(allUMdata.length / newRowsCount)
						////log("UM Page Count", UMPageCount)
						//////log(my_newnewLengthMenu)
						if(noUpcomingMatches === true){
							my_upcomingMatchesTable = makeNoUpcomingMatchesTable(allUMdata, ifPaging, my_newLengthMenu)
						} else {
							try {
								my_upcomingMatchesTable = makeUpcomingMatchesTable(allUMdata, ifPaging, my_newLengthMenu)
							} catch (err) {
								log(err)
							}					
						}
						
						selectedUMTable = 2
						checkOverflow(my_upcomingMatchesTable, allUMdata, ifPaging, origRowscount, my_newnewLengthMenu, my_UMDivHeight)
					} else {
						var my_activeTab = $('.tab-content').find('.tab-pane.active').attr('id')
						//log("no more resizing in UM; ativeTab:", my_activeTab)
						if(my_activeTab === tabTableContents[1] && startTab === tabTableContents[1] && reloadedData === true){
							//log("start tab UM")
							var UMstarttimeout = setTimeout(function(){getUMpageCount()}, 1000)
							refreshTimeInterval = setInterval(function(){ timeSinceLastRefreshTime += 1}, 1000)
							reloadedData = false
						}
					}
				}
				checkOverflow(my_upcomingMatchesTable, allUMdata, ifPaging, countUMRows, my_newLengthMenu, my_UMDivHeight, UMPageCount)
			}
			resizeUMTable()
			//page time config
			
			//on table change
			function getUMpageCount(){
				UMremakeCount = 0
				UMTimeout = setTimeout(function(){
					resizeUMTable()
			
				////log("Page count UM:", my_pageCount)
				//function pageTime(){
					function pageConfig(table){
						var tableInfo = table.page.info()
						UMPageCount = tableInfo.pages
						if(noUpcomingMatches === true){
							upcomingMatchesTabTime = 5000
						} else {
							upcomingMatchesTabTime = (document.getElementById("upcomingTime").value * 1000) - 4000
						}
						pageTimeconfig(true, "UM", my_upcomingMatchesTable, UMPageCount,minPageTime, upcomingMatchesTabTime, allUMdata)
					}
					pageConfig(my_upcomingMatchesTable)
				}, 500)
			}
			
			$('#upcomingMatches-button').on('changeTable', function(e) {
					UMdetectChangeCount +=1	
					if (UMdetectChangeCount === 1){
						UMclickChange += 1
						//log("change table detected in UM with nr.:", UMclickChange, startTab)		
							
							if(startTab === tabTableContents[1] && timeSinceLastRefreshTime >= reloadDataTimeSecs){
								//log("start refresh tab UM")
								if(sampleData === false){
									$.when(checkForAPIChange())
									.then(function(){
										if(ifAPIChangeDetected === true){
											temprefreshTimeout = setTimeout(function(){
											removeTables()}, 1000)
										} else {
											nextTablePage(true, "UM", my_upcomingMatchesTable, newUMPageTime, newUMTableTime)
										}
									})
								} else {
									ifAPIChangeDetected = true
									temprefreshTimeout = setTimeout(function(){
									removeTables()}, 1000)
								}
								//getAPIDataAndMakeTables()}, 1000)
							} else if(UMclickChange === 1 && startTab === tabTableContents[1]){
								//log("second time in UM tab and UM start tab")
								nextTablePage(true, "UM", my_upcomingMatchesTable, newUMPageTime, newUMTableTime)
							} else if(UMclickChange === 1 && startTab != tabTableContents[1]){
								//log("first time in UM tab and UM not start tab")
								getUMpageCount()						
							} else if(UMclickChange > 1){
								//log(">1 time in UM tab")
								nextTablePage(true, "UM", my_upcomingMatchesTable, newUMPageTime, newUMTableTime)
							} else {
								//log("error occured in UM change table detection", UMclickchange, startTab)
							}
				}					
			})
			
			
			$('#upcomingMatches').on('tab', function(e) {
			  //alert("my alert");
			});
		} 
		/*stop //log*/
		try {	
			if(logUpcomingMatch === true){
				if(my_upcomingMatches.length === 0){
					logUpcomingMatch = false
				}
				if(arraycount > 1){
					//////log(allUpcomingMatchInfoObjects)
					//////log("\n ---------- \n new load")
					//////log("currentIDArray", mycurrentLocalIDArray)
					
					var prevArrayNr = arraycount - 1
					var prevIDArray = window['load' + prevArrayNr]
					var prevStringArray = window['StringArray' + prevArrayNr]			
					var currentIDArray = mycurrentLocalIDArray		
					//////log("old array:", prevIDArray,"\nnew array:",currentIDArray)
					//////log("prev String array:", prevStringArray)
					var my_locaIDdifferenceArray = $(prevIDArray).not(currentIDArray).get()
					var uniqueIdsArray = [];
					$.each(my_locaIDdifferenceArray, function(i, el){
						if($.inArray(el, uniqueIdsArray) === -1){
							
						 uniqueIdsArray.push(el);
						}
					});
					//////log("difference", uniqueIdsArray)
					
					if(uniqueIdsArray.length > 0){
						for(var dif = 0; dif < uniqueIdsArray.length; dif++){
							var my_localID = uniqueIdsArray[dif]
							//////log(my_localID, my_locationsList)
							var matchObject = my_locationsList.find(x => x.localId === my_localID)
							//////log(matchObject)
							
							var InCompleteMatchIDArray = inArray(my_localID, completeMatchIDArray)
							if(InCompleteMatchIDArray === true){	
								//////log(true, "in CompleteIDArray")	
								var inCurrent = inArray(my_localID, mycurrentLocalIDArray)
								if(inCurrent === false){
										//////log("false")
										var my_currentFinishSingleStringsObject = {}
										var stop = "stop"
										var jsCurrentTimeF = new Date()
										//log(jsCurrentTimeF)
										var isoCurrentTimeF =  jsToisoDate(jsCurrentTimeF)
										//////log("all um objects,", allUpcomingMatchInfoObjects)
										
										//find upcoming match object with lowest UMnr
										var filter = {localId: my_localID};
										var matchIdUpcomingMatchesObjects = []
										var _SmatchInfoObjects = allUpcomingMatchInfoObjects.filter(function(item) {
											for(var key in filter) {
												//log(filter)
												if(item[key] === my_localID){
													//log("found filtered object:", item)
													matchIdUpcomingMatchesObjects.push(item)
												}												
											}
										});
										var filteredObjectsMatchNrs = []
										for(var nr = 0 ; nr < matchIdUpcomingMatchesObjects.length; nr++){
											var _umnr = matchIdUpcomingMatchesObjects[nr].UMNr
											//log(_umnr)
											filteredObjectsMatchNrs.push(_umnr)
										}
										filteredObjectsMatchNrs.sort(function(a, b){return a-b})
										//log(filteredObjectsMatchNrs)
										var smallestUMNr = Math.min(filteredObjectsMatchNrs)
										if(isNaN(smallestUMNr) === true){
											lengthObjects = matchIdUpcomingMatchesObjects.length
											var matchInfoObject =  matchIdUpcomingMatchesObjects[lengthObjects - 1]
											var objectSelected = true
											//smallestUMNr = selectedmatchidObject.UMNr
											//log("selected latest obj of same UMNr:", matchInfoObject)
										} else {var objectSelected = false }
										//log("smallest:", objectSelected, smallestUMNr)									
										if(objectSelected === false){
											var matchInfoObject = matchIdUpcomingMatchesObjects.find(x => x.UMNr === smallestUMNr)
										}
										//log("found corresponding object", matchInfoObject)					
										
										//corresping match id start object
										var startObject = completeStartObjects.find(x => x.matchId === my_localID)
										
										//stop info
										var processIDF = stop+my_localID.toString()
										var lastExpectedTime = matchInfoObject.expectedTime
										var ifReadytoPlayF = matchInfoObject.readyToPlay
										var ifPlayerPlayingF = matchInfoObject.playersPlaying
										var ifUnavailableF = matchInfoObject.playersUnavailable
										var poolnameF = matchInfoObject.pool
										
										var expectedTimeDifferenceF = startObject.expectedTime - lastExpectedTime
										var timeDifferenceSecsF = diff_secs(jsCurrentTimeF, startObject.jsDate);
										
										//log(startObject.jsDate)
										//log(timeDifferenceSecsF)
										
										my_currentFinishSingleStringsObject.status = stop
										my_currentFinishSingleStringsObject.reloadDataTimeInterval = reloadDataTimeSecs
										my_currentFinishSingleStringsObject.matchId = my_localID
										
										my_currentFinishSingleStringsObject.dataReloadCount = reloadDataCount
										my_currentFinishSingleStringsObject.timeSinceLastRefresh = lastRefreshTimeLog
										
										my_currentFinishSingleStringsObject.jsDate = jsCurrentTimeF
										my_currentFinishSingleStringsObject.isoDate = isoCurrentTimeF
										my_currentFinishSingleStringsObject.processID = processIDF
										my_currentFinishSingleStringsObject.expectedTime = lastExpectedTime
										my_currentFinishSingleStringsObject.ifReadytoPlay = ifReadytoPlayF
										my_currentFinishSingleStringsObject.ifPlayerPlaying = ifPlayerPlayingF
										my_currentFinishSingleStringsObject.ifUnavailable = ifUnavailableF
										my_currentFinishSingleStringsObject.pool = poolnameF
										my_currentFinishSingleStringsObject.expectedTimeDifference = expectedTimeDifferenceF
										my_currentFinishSingleStringsObject.timeDifferenceSecs = timeDifferenceSecsF

										my_stopArray.push(/*tournament_ID,*/ tournamentName, reloadDataCount, processIDF, stop, my_localID, poolnameF, isoCurrentTimeF, lastExpectedTime, ifReadytoPlayF, ifPlayerPlayingF, ifUnavailableF, reloadDataTimeSecs, lastRefreshTimeLog, expectedTimeDifferenceF, timeDifferenceSecsF)
										
										
										completeStopObjets.push(my_currentFinishSingleStringsObject)
										completeStopArray.push(my_stopArray)
										
										var my_stopOutputString = my_stopArray.join(";")
										var my_StopinputString = my_stopOutputString + ";"
										
										/* */ /** INPUT VALUE **/ /* */
										//log(my_StopinputString)
										//objects
											//UM_stopLog.push(my_currentFinishSingleStringsObject)
											//UM_loopStopLog.push(my_currentFinishSingleStringsObject)
										//arrays
											//UM_stopLog.push(my_stopArray)
											//UM_loopStopLog.push(my_stopArray)
										//strings
											UM_stopLog.push(my_StopinputString)
											UM_loopStopLog.push(my_StopinputString)
								}		
							}
						}
					}
				//////log("\n ---------- \n")
				}
				if((UM_loopStartLog.length > 0 || UM_loopStopLog.length > 0) && ifMobile === false){
					//log(UM_loopStartLog, UM_loopStopLog)
					UM_loopLogStrings = []
					UM_loopLogStrings = UM_loopStartLog.concat(UM_loopStopLog)
					//log(UM_loopLogStrings)
					$('#invisibleButton').trigger("click")
				}
			}
		} catch (err){
			log(err)
		}
    document.getElementById("upcomingMatchesLoader").style.display = "none"
    if (ifMobile == true) {
        $("#creditsTextUpcoming").append(creditsTextAppendText)
    }
}