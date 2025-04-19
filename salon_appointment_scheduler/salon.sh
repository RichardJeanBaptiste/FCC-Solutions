#!/bin/bash

#PSQL="psql --username=freecodecamp --dbname=salon -c"
PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"


echo -e "\n~~~~~ Welcome to the salon ~~~~\n"

MAIN_MENU() {

  SERVICES=$($PSQL "SELECT service_id, name FROM services")

  echo "$SERVICES" | while read ID SERVICE
  do
    echo "$ID) $SERVICE" | sed "s/| //"
  done

  read SERVICE_ID_SELECTED

  case $SERVICE_ID_SELECTED in
    1) SERVICE 1 "wash";;
    2) SERVICE 2 "set" ;;
    3) SERVICE 3 "braid";;
    *) MAIN_MENU 
  esac
}

SERVICE() {

  echo -e "\nEnter phone number"
  read CUSTOMER_PHONE

  GET_PHONE=$($PSQL "SELECT phone FROM customers WHERE phone = '$CUSTOMER_PHONE'")

  if [[ -z $GET_PHONE ]]
  then
    # New Customer
    echo -e "\nEnter your name"
    read CUSTOMER_NAME

    ADD_CUST=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")
  fi

  echo -e "\nWhat time do you want this appointment"
  read SERVICE_TIME

  GET_CUSTOMER=$($PSQL "SELECT customer_id,phone,name FROM customers WHERE phone = '$CUSTOMER_PHONE'")

  #echo $GET_CUSTOMER

  echo "$GET_CUSTOMER" | while read ID PHONE BAR BAR NAME
  do
    INSERT_APPOINTMENT=$($PSQL "INSERT INTO appointments(time,customer_id,service_id) VALUES('$SERVICE_TIME', '$ID','$1')")
    echo -e "I have put you down for a $2 at $SERVICE_TIME, $NAME."
    #echo "$ID $PHONE $NAME"
    #echo $ID
    #echo $NAME
  done

  #MAIN_MENU
}

## Call Main Menu
MAIN_MENU 