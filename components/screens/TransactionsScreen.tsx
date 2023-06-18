import {Text, View, StyleSheet} from "react-native";
import * as React from "react";
import {FAB, List, Modal, Portal} from 'react-native-paper';
import {useState} from "react";
// @ts-ignore
import { FloatingMenu, FloatingButton } from 'react-native-floating-action-menu';
import {MaterialCommunityIcons} from "@expo/vector-icons";



interface IState {
    open: boolean;
}

export const TransactionsScreen: React.FC = () => {
    const MaterialMenu: any = require('react-native-material-menu').default;
    const MenuItem: any = require('react-native-material-menu').MenuItem;

    const [visible, setVisible] = useState<boolean>(false);

    const [isOpen, setIsOpen] = useState(false);

    const onMenuToggle = (isOpen: boolean) => {
        setIsOpen(isOpen);
    };
    const showModal = () => setVisible(true);

    const hideModal = () => setVisible(false);

    let _menu: any = null;
    const [state, setState] = React.useState<IState>({ open: false });

    const onStateChange = ({ open }: IState) => setState({ open });

    const { open } = state;

    const setMenuRef = (ref: any) => {
        _menu = ref;
    };

    const hideMenu = () => {
        _menu?.hide();
    };

    const showMenu = () => {
        _menu?.show();
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <View style={styles.container}>
            <Text>Transactions!</Text>
            <FAB.Group
                open={open}
                icon={open ? 'menu' : 'plus'}
                actions={[
                    { icon: 'plus', onPress: () => console.log('Pressed add') },
                    { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star')},
                    { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
                    { icon: 'bell', label: 'Remind', onPress: () => console.log('Pressed notifications') },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                        // do something if the speed dial is open
                    }
                }}
                visible
            />
            <FloatingMenu
                buttonSize={56}
                overlayColor={'rgba(0, 0, 0, 0.2)'}
                isOpen={isOpen}
                fromDirection="left"
                toDirection="up"
                onMenuToggle={onMenuToggle}
                buttonIcon={<MaterialCommunityIcons name="key" size={24} color="white" />}
                fabIcon={<MaterialCommunityIcons name="plus" size={24} color="white" />}
                fabIconOpen={<MaterialCommunityIcons name="key" size={24} color="white" />}
            >
                <FloatingButton
                    text="Action 1"
                    icon={<MaterialCommunityIcons name="home" size={24} color="white" />}
                    onPress={() => console.log('Action 1')}
                />
                <FloatingButton
                    text="Action 2"
                    icon={<MaterialCommunityIcons name="star" size={24} color="white" />}
                    onPress={() => console.log('Action 2')}
                />
                <FloatingButton
                    text="Action 3"
                    icon={<MaterialCommunityIcons name="key" size={24} color="white" />}
                    onPress={() => console.log('Action 3')}
                />
            </FloatingMenu>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 5,
    },
});
