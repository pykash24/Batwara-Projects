import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../../store/slice/ExpenseDetailSlice';
import FontAwesomIcon from 'react-native-vector-icons/FontAwesome5';
import CommonCardStyles from '../../shared/CommonCardStyles';
import { Colors } from '../../constants/Colors';
import { formatDate } from '../../utils/Helper';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

const Schedule = () => {
    const expenseCTX = useSelector((state) => state.expense);

    const [items, setItems] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigation = useNavigation();
    const dispatch = useDispatch()

    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Schedule Trip Date",
            headerLeft: () => (
                <TouchableOpacity style={[CommonCardStyles.mr10]} onPress={() => navigation.goBack()}>

                    <FontAwesomIcon name="arrow-left" color={Colors.white} size={20} />
                </TouchableOpacity>
            ),
            headerSearchBarOptions: {
                placeholder: "Search",
                onChangeText: (event) => { handleSearch(event.nativeEvent.text) }
            }
        })
    }, [navigation])
    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if (!items[strTime]) {
                    items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < 1; j++) {
                        items[strTime].push({
                            name: 'Trip on ' + strTime,
                            date: strTime
                            //   height: Math.max(50, Math.floor(Math.random() * 150)),
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    };

    const onDateSelect = (date) => {
        dispatch(expenseActions?.setDate({ date: date }))
        console.log('a123', date);
        setSelectedDate(new Date(date))
        navigation.navigate('AddExpense', {
            selectedDate: date
        });
    }
    useEffect(() => {
        try {
            let selected = expenseCTX?.date
            if (!!selected && selected != undefined) {
                console.log('mmmmmmmmmm999');
                setSelectedDate(formatDate(new Date(selected)))
            }
            else {
                setSelectedDate(new Date())
            }
        } catch (error) {
            console.log('error',error);
        }

    }, []);
    const renderItem = (item) => {
        return (
            <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }} onPress={() => onDateSelect(item?.date)}>
                <Card>
                    <Card.Content>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Text> {item?.name}                </Text>
                            {/* <Typography>{item.name}</Typography> */}
                            <Avatar.Text label="Go" />
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={selectedDate}
                renderItem={renderItem}
                onDayPress={(day) => { onDateSelect(day.dateString) }}

            />
        </View>
    );
};

export default Schedule;