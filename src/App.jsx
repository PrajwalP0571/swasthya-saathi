import { useApp } from './context/AppContext.jsx'
import WelcomeScreen from './screens/WelcomeScreen.jsx'
import LanguageScreen from './screens/LanguageScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import DashboardScreen from './screens/DashboardScreen.jsx'
import MemberProfileScreen from './screens/MemberProfileScreen.jsx'
import SchemeFinderScreen from './screens/SchemeFinderScreen.jsx'
import QuestionsScreen from './screens/QuestionsScreen.jsx'
import ResultsScreen from './screens/ResultsScreen.jsx'
import NearbyCareScreen from './screens/NearbyCareScreen.jsx'
import MedicinesScreen from './screens/MedicinesScreen.jsx'
import AwarenessScreen from './screens/AwarenessScreen.jsx'

export default function App() {
  const { screen } = useApp()

  return (
    <>
      {screen === 'welcome'       && <WelcomeScreen />}
      {screen === 'language'      && <LanguageScreen />}
      {screen === 'profile'       && <ProfileScreen />}
      {screen === 'dashboard'     && <DashboardScreen />}
      {screen === 'memberProfile' && <MemberProfileScreen />}
      {screen === 'schemeFinder'  && <SchemeFinderScreen />}
      {screen === 'questions'     && <QuestionsScreen />}
      {screen === 'results'       && <ResultsScreen />}
      {screen === 'nearby'        && <NearbyCareScreen />}
      {screen === 'medicines'     && <MedicinesScreen />}
      {screen === 'awareness'     && <AwarenessScreen />}
    </>
  )
}
