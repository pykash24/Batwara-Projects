import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Colors } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlexStyles from '../../assets/Styles/FlexStyles';
import CommonStyles from '../../assets/Styles/CommonStyles';
import TextStyles from '../../assets/Styles/TextStyles';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const Card = ({ title, time, admin, members, content, amount }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsCollapsed(!isCollapsed);
    };

    return (
        <View style={styles.card}>
            <View style={[styles.cardBorderStyle]}></View>
            <TouchableOpacity onPress={toggleCollapse}>
                <View style={styles.cardHeader}>
                    <Text style={styles.headerText}>{title}</Text>
                    <Text style={styles.dateTimeText}>{time}</Text>
                </View>
                <View style={styles.cardSubHeader}>
                    <View style={[FlexStyles.flex1, FlexStyles.flexDirectionrow, FlexStyles.alignItems]}>
                        <Icon name="user" style={styles.iconsStyles} size={16} color={Colors.commonBlack} />
                        <Text style={styles.memberText}>{admin}</Text>
                    </View>
                    <View style={[FlexStyles.flex1, FlexStyles.flexDirectionrow, FlexStyles.alignItems]}>
                        <Icon name="users" style={styles.iconsStyles} size={16} color={Colors.commonBlack} />
                        <Text style={styles.memberText}>{members}</Text>
                    </View>
                </View>
                <View style={styles.hLine}></View>
            </TouchableOpacity>

            <View style={styles.cardSubContent}>
                <View style={[FlexStyles.flex1, FlexStyles.flexDirectionrow, FlexStyles.alignItems]}>
                    <Icon name="wechat" style={styles.iconsStyles} size={16} color={Colors.commonBlack} />
                    <Text style={styles.memberText}>{'Chat'}</Text>
                </View>
                <View style={styles.vLine}></View>
                <View style={[FlexStyles.flex1, FlexStyles.flexDirectionrow, FlexStyles.alignItems]}>
                    <Icon name="money" style={styles.iconsStyles} size={16} color={Colors.commonBlack} />
                    <Text style={styles.memberText}>{'Send Split'}</Text>
                </View>
                <View style={[CommonStyles.ml20, FlexStyles.flex1, FlexStyles.flexDirectionrow, FlexStyles.alignItems]}>
                    <View style={styles.vLine}></View>
                    <View style={[FlexStyles.flex1, FlexStyles.flexDirectionrow, FlexStyles.alignItems]}>
                        <Icon name="rupee" style={styles.iconsStyles} size={16} color={Colors.commonBlack} />
                        <Text style={styles.memberText}>{amount}</Text>
                    </View>
                </View>
                <View style={styles.vLine}></View>
                <TouchableOpacity onPress={toggleCollapse}>
                    <View style={[FlexStyles.flex1, FlexStyles.flexDirectionrow, FlexStyles.alignItems]}>
                        <Icon name="navicon" style={styles.iconsStyles} size={16} color={Colors.commonBlack} />
                        <Text style={[styles.memberText, CommonStyles.mr8]}>{'More'}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {isCollapsed && (
                <>
                    <View style={[styles.hLine, CommonStyles.mt_2]}></View>
                    <View style={styles.cardContent}>
                        {content.map((item, index) => (
                            <View style={[FlexStyles.flexBetween, FlexStyles.flexDirectionrow, FlexStyles.alignItems, CommonStyles.mb2]} key={index}>
                                <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems]}>
                                    <Text style={styles.memberText}>
                                        {item.status === 'Pending' ? <View style={styles.redDot} /> : item.status === 'Paid' ? <View style={styles.greenDot} /> : null}
                                    </Text>
                                    <Text style={styles.memberText}>
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={[CommonStyles.mr10]}>
                                    <Text style={styles.memberText}>{item.status === 'Pending' ? <Text style={[TextStyles.pendingText]}>{'Pending'}</Text> : item.status === 'Paid' ? <Text style={[TextStyles.successText]}>{'Paid'}</Text> : null}</Text>
                                </View>

                            </View>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
};

const Cards = () => {
    const cardData = [
        {
            id: 1,
            title: 'Lonavala wet n joy resort',
            time: 'Sat 20-March',
            admin: 'Anupama Borkar',
            members: '3',
            amount: '4505',
            content: [
                {
                    id: 1,
                    name: 'Anupama Borkar',
                    status: 'Paid',
                },
                {
                    id: 2,
                    name: 'Ankita Hushar',
                    status: 'Pending',
                },
                {
                    id: 3,
                    name: 'Mahesh Shendage',
                    status: 'Paid',
                }
            ],
        },
        {
            id: 2,
            title: 'Wonder park',
            time: 'Sat 20-March',
            admin: 'Vikas Thakur',
            members: '2',
            amount: '4505',
            content: [
                {
                    id: 1,
                    name: 'Vikas Thakur',
                    status: 'Pending',
                },
                {
                    id: 2,
                    name: 'Babalu Dabalu',
                    status: 'Paid',
                }
            ],
        },
        {
            id: 3,
            title: 'Mahableshwar trekking',
            time: 'Sat 20-March',
            admin: 'Vikas Thakur',
            members: '6',
            amount: '4505',
            content: [
                {
                    id: 1,
                    name: 'Mahesh Shendage',
                    status: 'Pending',
                },
                {
                    id: 2,
                    name: 'Vikas Tomar',
                    status: 'Pending',
                },
                {
                    id: 3,
                    name: 'Ankush Aher',
                    status: 'Pending',
                },
                {
                    id: 4,
                    name: 'Mahesh Shendage',
                    status: 'Pending',
                },
                {
                    id: 5,
                    name: 'Vikas Tomar',
                    status: 'Paid',
                },
                {
                    id: 6,
                    name: 'Ankush Aher',
                    status: 'Pending',
                }
            ],
        },
    ];

    return (
        <View style={styles.container}>
            {cardData.map((card, index) => (
                <Card
                    key={index}
                    title={card.title}
                    time={card.time}
                    admin={card.admin}
                    content={card.content}
                    members={card.members}
                    amount={card.amount}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    card: {
        // borderWidth: 1,
        backgroundColor: 'white',
        width: '105%',
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        elevation: 2,
    },
    redDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
    },
    greenDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'green',
    },
    cardBorderStyle: {
        width: 100,
        height: 2.5,
        backgroundColor: 'orange',
        borderBottomRightRadius: 5,
    },
    cardHeader: {
        flex: 1,
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardSubHeader: {
        flex: 1,
        marginTop: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardSubContent: {
        flex: 1,
        marginTop: 3,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    headerText: {
        width: '70%',
        color: Colors.commonBlack,
        marginTop: -3,
        marginLeft: 5,
        padding: 5,
        fontWeight: '700',
    },
    dateTimeText: {
        fontSize: 12,
        color: Colors.commonBlack,
        marginRight: 5,
        marginTop: -6,
        fontWeight: '400',
    },
    memberText: {
        fontSize: 12,
        color: Colors.commonBlack,
        fontWeight: '400',
        marginLeft: 10,
    },
    iconsStyles: {
        marginLeft: 10,
    },
    hLine: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    vLine: {
        borderLeftColor: '#ccc',
        borderLeftWidth: 1,
        marginHorizontal: 0,
        height: 18,
    },
    cardContent: {
        padding: 3,
    },
    contentText: {
        marginBottom: 5,
    },
});

export default Cards;

