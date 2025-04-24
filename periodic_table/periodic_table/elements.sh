PSQL="psql -X --username=freecodecamp --dbname=periodic_table --tuples-only -c"

EL_FROM_NUM() {
  EL=$($PSQL "SELECT * FROM elements INNER JOIN properties ON elements.atomic_number = properties.atomic_number INNER JOIN types ON types.type_id = properties.type_id WHERE properties.atomic_number = $1")

  if [[ -z $EL ]]
  then
    echo "I could not find that element in the database."
  else
    echo $EL | while read A_NUM BAR SYMBOL BAR NAME BAR B_NUM BAR MASS BAR MELT_POINT BAR BOILING_POINT BAR C_NUM BAR D_NUM BAR TYPE
    do
      echo -e "The element with atomic number $A_NUM is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELT_POINT celsius and a boiling point of $BOILING_POINT celsius."
    done  
  fi
}

EL_FROM_LETTER() {
  EL=$($PSQL "SELECT * FROM elements INNER JOIN properties ON elements.atomic_number = properties.atomic_number INNER JOIN types ON types.type_id = properties.type_id WHERE symbol = '$1'")
  if [[ -z $EL ]]
  then
    echo "I could not find that element in the database."
  else
    echo $EL | while read A_NUM BAR SYMBOL BAR NAME BAR B_NUM BAR MASS BAR MELT_POINT BAR BOILING_POINT BAR C_NUM BAR D_NUM BAR TYPE
    do
      echo -e "The element with atomic number $A_NUM is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELT_POINT celsius and a boiling point of $BOILING_POINT celsius."
    done
  fi  
}

EL_FROM_NAME() {
  EL=$($PSQL "SELECT * FROM elements INNER JOIN properties ON elements.atomic_number = properties.atomic_number INNER JOIN types ON types.type_id = properties.type_id WHERE name = '$1'")
  if [[ -z $EL ]]
  then
    echo "I could not find that element in the database."
  else
    echo $EL | while read A_NUM BAR SYMBOL BAR NAME BAR B_NUM BAR MASS BAR MELT_POINT BAR BOILING_POINT BAR C_NUM BAR D_NUM BAR TYPE
    do
      echo -e "The element with atomic number $A_NUM is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELT_POINT celsius and a boiling point of $BOILING_POINT celsius."
    done
  fi
}

if [[ -z "$1" ]]
then
  echo "Please provide an element as an argument."
elif [[ "$1" =~ ^[0-9]+$ ]]
then
  EL_FROM_NUM $1
elif [[ "$1" =~ ^[a-zA-Z]{1,2}$ ]]
then
  EL_FROM_LETTER $1
else
  EL_FROM_NAME $1
fi