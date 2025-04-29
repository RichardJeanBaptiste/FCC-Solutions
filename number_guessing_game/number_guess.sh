#!/bin/bash
PSQL="psql -X --username=freecodecamp --dbname=number_guess --tuples-only -c"

echo -e "\n~~ Number Guessing Game~~\n"

#ABC=$($PSQL "SELECT * FROM users")

min=1
max=1000 
ANSWER=$(($RANDOM % ($max-$min+1) + $min))

echo "Enter your username:"
read USERNAME

# check if user name exists
USER=$($PSQL "SELECT * FROM users WHERE username='$USERNAME'")
# if no 
if [[ -z $USER ]]
then
  echo -e "\n Welcome, $USERNAME! It looks like this is your first time here."
  # save USERNAME to database
  ADD_USER=$($PSQL "INSERT INTO users(username) VALUES('$USERNAME')")
  USER=$($PSQL "SELECT * FROM users WHERE username='$USERNAME'")
else
  
  USER_INFO=$($PSQL "SELECT u.username, u.games_played, MIN(g.guesses) AS min_guesses FROM users u INNER JOIN games g ON u.user_id = g.user_id WHERE u.username = '$USERNAME' GROUP BY u.username, u.games_played")

  echo "$USER_INFO" | while read NAME BAR GAMES_PLAYED BAR GUESSES
  do
    echo -e "\nWelcome back, $NAME! You have played $GAMES_PLAYED games, and your best game took $GUESSES guesses."
  done
fi

NUMBER_OF_TRIES=0


echo -e "\nGuess the secret number between 1 and 1000:"
read USER_GUESS

# if [[ "$USER_GUESS" != '^[0-9]+$' ]]
# then
#   echo -e "\nThat is not an integer, guess again:"
#   read USER_GUESS
# fi

while [[ ! "$USER_GUESS" =~ ^-?[0-9]+$ ]]
do
  echo -e "\nThat is not an integer, guess again:"
  read USER_GUESS
done

while [ "$USER_GUESS" != "$ANSWER" ]
do
  if [[ "$USER_GUESS" -lt "$ANSWER" ]]
    then echo "It's higher than that, guess again:"
  else
    echo "It's lower than that, guess again:"
  fi

  NUMBER_OF_TRIES=$((NUMBER_OF_TRIES + 1))
  read USER_GUESS

  while [[ ! "$USER_GUESS" =~ ^-?[0-9]+$ ]]
  do
    echo -e "\nThat is not an integer, guess again:"
    read USER_GUESS
  done

done

NUMBER_OF_TRIES=$((NUMBER_OF_TRIES + 1))
USER_ID=$($PSQL "SELECT user_id FROM users WHERE username='$USERNAME'")
# Add to games played
ADD_TO_GAMES_PLAYED=$($PSQL "UPDATE users SET games_played = games_played + 1 WHERE username='$USERNAME'")
# Add guesses / userid
ADD_COMPLETED_GAME=$($PSQL "INSERT INTO games(guesses, user_id) VALUES($NUMBER_OF_TRIES, $USER_ID)")
echo "You guessed it in $NUMBER_OF_TRIES tries. The secret number was $ANSWER. Nice job!"
