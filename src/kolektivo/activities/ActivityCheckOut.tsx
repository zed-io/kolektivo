import React, { RefObject, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { RNCamera } from 'react-native-camera'
import BottomSheet, { BottomSheetRefType } from 'src/components/BottomSheet'
import Button, { BtnSizes } from 'src/components/Button'
import TextInput from 'src/components/TextInput'
import i18n from 'src/i18n'
import { CameraIcon } from 'src/icons/Camera'
import { ActivityModel } from 'src/kolektivo/activities/utils'
import { Colors } from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import { Spacing } from 'src/styles/styles'
import variables from 'src/styles/variables'
import { formatFeedDate, formatFeedTime } from 'src/utils/time'

export default function ActivityCheckOutSheet({
  forwardedRef,
  activity,
  checkOut,
  onChangeAnswer,
  onTakeSelfie,
}: {
  forwardedRef: RefObject<BottomSheetRefType>
  activity: ActivityModel
  checkOut: () => void
  onChangeAnswer: (answer: string) => void
  onTakeSelfie: (uri: string) => void
}) {
  const { t } = useTranslation()
  const [step, setStep] = useState<number>(0)
  const [answer, setAnswer] = useState<string>('')

  const handleChangeAnswer = (text: string) => {
    setAnswer(text)
    onChangeAnswer(text)
  }

  const CurrentCheckOutStep = useCallback(() => {
    switch (step) {
      case 1:
        return <ActivityCheckOutQuestion onChangeAnswer={handleChangeAnswer} />
      case 2:
        return <ActivityCheckOutSelfie onTakeSelfie={onTakeSelfie} />
      default:
        return null
    }
  }, [step])

  const nextStep = useCallback(() => {
    setStep((step) => step + 1)
  }, [step])

  const ActivityActionButton = useCallback(() => {
    return (
      <Button
        text={t('checkOut.title')}
        onPress={nextStep}
        disabled={step !== 0 && answer === ''}
        testID={`CommunityEvent/CheckIn/CheckOut`}
        size={BtnSizes.FULL}
      />
    )
  }, [t])

  const { title, description, testId } = useMemo(() => {
    switch (step) {
      case 0:
        return {
          title: 'checkOut.title',
          description: 'checkOut.description',
          testId: 'CommunityEvent/CheckOutSheet',
        }
      case 1:
        return {
          title: 'checkOut.question',
          description: 'checkOut.questionDescription',
          testId: 'CommunityEvent/CheckOutSheet/Question',
        }
      default:
        return {
          title: '',
          description: '',
          testId: '',
        }
    }
  }, [step])

  return (
    <BottomSheet
      forwardedRef={forwardedRef}
      title={t(title, { activityTitle: activity.title })}
      description={t(description, {
        activityTitle: activity.title,
        activityDate: `${formatFeedDate(new Date(activity.start_date).getTime(), i18n)} ${formatFeedTime(new Date(activity.start_date).getTime(), i18n)}`,
      })}
      testId={'CommunityEvent/CheckInSheet'}
      titleStyle={styles.title}
    >
      <View style={styles.actionsContainer}>
        <CurrentCheckOutStep />
        <ActivityActionButton />
      </View>
    </BottomSheet>
  )
}

type ActivityCheckOutQuestionProps = {
  onChangeAnswer: (answer: string) => void
}

const ActivityCheckOutQuestion = ({ onChangeAnswer }: ActivityCheckOutQuestionProps) => {
  const { t } = useTranslation()
  const [answer, setAnswer] = useState<string>('')

  const handleChangeAnswer = (text: string) => {
    setAnswer(text)
    onChangeAnswer(text)
  }

  return (
    <View>
      <TextInput
        value={answer}
        onChangeText={handleChangeAnswer}
        placeholder={t('checkOut.answerPlaceholder')}
      />
    </View>
  )
}

type ActivityCheckOutSelfieProps = {
  onTakeSelfie: (uri: string) => void
}

const ActivityCheckOutSelfie = ({ onTakeSelfie }: ActivityCheckOutSelfieProps) => {
  const { t } = useTranslation()
  const [camera, setCamera] = useState<RNCamera | null>(null)

  const takePicture = async () => {
    if (camera && !__DEV__) {
      try {
        const options = {
          quality: 0.5,
          base64: false,
          pauseAfterCapture: true,
          orientation: 'portrait',
        }
        const data = await camera.takePictureAsync(options)
        onTakeSelfie(data.uri)
      } catch (error) {
        console.error('Error taking picture:', error)
      }
    } else {
      onTakeSelfie(
        'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      )
    }
  }

  return (
    <View style={styles.cameraContainer}>
      <RNCamera
        ref={(ref) => setCamera(ref)}
        style={styles.camera}
        type={RNCamera.Constants.Type.front}
        androidCameraPermissionOptions={{
          title: t('camera.permissionTitle'),
          message: t('camera.permissionMessage'),
          buttonPositive: t('camera.ok'),
          buttonNegative: t('camera.cancel'),
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <CameraIcon size={24} />
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  )
}

const styles = StyleSheet.create({
  actionsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: Spacing.Regular16,
    marginVertical: Spacing.Thick24,
  },
  title: {
    ...typeScale.titleSmall,
    color: Colors.black,
  },
  cameraContainer: {
    height: 400,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: '#EAF6F6',
    padding: Spacing.Regular16,
    borderRadius: variables.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
