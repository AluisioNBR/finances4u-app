import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignInScreen } from '../screens/SignIn/SignInScreen'
import { SignUpScreen } from '../screens/SignUp/SignUpScreen'
import { StartScreen } from '../screens/Start/StartScreen'
import { StatementScreen } from '../screens/StatementScreen/StatementScreen'
import { GoalCreationScreen } from '../screens/GoalCreation/GoalCreationScreen'
import { GoalDetailsScreen } from '../screens/GoalDetails/GoalDetailsScreen'
import { HomeScreen } from '../screens/Home/HomeScreen'
import { BlocksScreen } from '../screens/Blocks/BlocksScreen'
import { SettingsScreen } from '../screens/Settings/SettingsScreen'
import { SupportScreen } from '../screens/Support/SupportScreen'
import { SugestionsScreen } from '../screens/Sugestions/SugestionsScreen'
import { AboutScreen } from '../screens/About/AboutScreen'
import { HomeActionModal } from '../screens/HomeActionModal/HomeActionModal'
import { LoadingModal } from '../screens/LoadingModal/LoadingModal'
import { GoalActionModal } from '../screens/GoalActionModal/GoalActionModal'
import { ConfirmGoalDeleteModal } from '../screens/ConfirmGoalDeletionModal/ConfirmGoalDeleteModal'
import { BlocksEditModal } from '../screens/BlocksEditModal/BlocksEditModal'
import { SettingsModal } from '../screens/SettingsModal/SettingsModal'

const Stack = createNativeStackNavigator()

export function StackNav() {
	return (
		<Stack.Navigator
			id='Default'
			initialRouteName='Start'
			screenOptions={{ headerShown: false }}
		>
			<Stack.Group>
				<Stack.Screen name='Start' component={StartScreen} />
				<Stack.Screen name='Home' component={HomeScreen} />
				<Stack.Screen name='GoalDetails' component={GoalDetailsScreen} />
				<Stack.Screen name='Statement' component={StatementScreen} />
				<Stack.Screen name='Blocks' component={BlocksScreen} />
				<Stack.Screen name='Settings' component={SettingsScreen} />
				<Stack.Screen name='Support' component={SupportScreen} />
				<Stack.Screen name='Sugestions' component={SugestionsScreen} />
				<Stack.Screen name='About' component={AboutScreen} />
			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name='SignUp' component={SignUpScreen} />
				<Stack.Screen name='SignIn' component={SignInScreen} />
				<Stack.Screen name='GoalCreation' component={GoalCreationScreen} />
				<Stack.Screen
					name='LoadingModal'
					component={LoadingModal}
					initialParams={{ redirect: '' }}
				/>
			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
				<Stack.Screen
					name='HomeActionModal'
					initialParams={{
						label1: 'Dê um nome para seu bloqueio',
						label2: 'Quanto irá bloquear ?',
						showAvailableBalance: true,
						type: 'block',
					}}
					component={HomeActionModal}
				/>
				<Stack.Screen name='GoalActionModal' component={GoalActionModal} />
				<Stack.Screen
					name='ConfirmGoalDeleteModal'
					component={ConfirmGoalDeleteModal}
				/>
				<Stack.Screen name='BlocksEdit' component={BlocksEditModal} />
				<Stack.Screen name='SettingsModal' component={SettingsModal} />
			</Stack.Group>
		</Stack.Navigator>
	)
}
