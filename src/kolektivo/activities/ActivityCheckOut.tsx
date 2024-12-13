import React, { Fragment, RefObject, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import BottomSheet, { BottomSheetRefType } from 'src/components/BottomSheet'
import Button, { BtnSizes } from 'src/components/Button'
import TextInput from 'src/components/TextInput'
import i18n from 'src/i18n'
import { CameraIcon } from 'src/icons/Camera'
import ImageTree from 'src/icons/ImageTree'
import { ActivityModel } from 'src/kolektivo/activities/utils'
import { Colors } from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import { Spacing } from 'src/styles/styles'
import variables from 'src/styles/variables'
import { ensureError } from 'src/utils/ensureError'
import { getDataURL, saveProofOfAttendancePicture } from 'src/utils/image'
import Logger from 'src/utils/Logger'
import { formatFeedDate, formatFeedTime } from 'src/utils/time'

export default function ActivityCheckOutSheet({
  forwardedRef,
  activity,
  loading,
  checkOut,
  onChangeAnswer,
  onImageSelected,
  completed,
}: {
  forwardedRef: RefObject<BottomSheetRefType>
  activity: ActivityModel
  loading: boolean
  checkOut: () => void
  onChangeAnswer: (answer: string) => void
  onImageSelected: (uri: string) => void
  completed: boolean
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
        return <ActivityCheckOutSelfie onImageSelected={onImageSelected} loading={loading} />
      default:
        return null
    }
  }, [step])

  const nextStep = useCallback(() => {
    if (step === 2) {
      forwardedRef.current?.close()
      checkOut()
    } else {
      setStep((step) => step + 1)
    }
  }, [step])

  const isDisabled = useMemo(() => {
    if (step === 0) {
      return false
    }
    if (step === 1) {
      return answer === ''
    }
    if (step === 2) {
      return loading || !completed
    }
    return false
  }, [step, answer, loading, completed])

  useEffect(() => {
    if (step === 1) {
      forwardedRef.current?.snapToIndex(1)
    }
    if (step === 2) {
      forwardedRef.current?.snapToIndex(2)
    }
  }, [step])

  // @note If keyboard is open, open the bottom sheet more
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      forwardedRef.current?.snapToIndex(3)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      if (step !== 2) {
        forwardedRef.current?.snapToIndex(1)
      }
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [step])

  const ActivityActionButton = useCallback(() => {
    return (
      <Button
        text={t('checkOut.title')}
        onPress={nextStep}
        disabled={isDisabled}
        testID={`CommunityEvent/CheckIn/CheckOut`}
        size={BtnSizes.FULL}
      />
    )
  }, [t, isDisabled])

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
      case 2:
        return {
          title: 'checkOut.selfie',
          description: 'checkOut.selfieDescription',
          testId: 'CommunityEvent/CheckOutSheet/Selfie',
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
      snapPoints={['33%', '50%', '85%', '95%']}
      title={t(title, { activityTitle: activity.title })}
      description={t(description, {
        activityTitle: activity.title,
        activityDate: `${formatFeedDate(new Date(activity.start_date).getTime(), i18n)} ${formatFeedTime(new Date(activity.start_date).getTime(), i18n)}`,
      })}
      onClose={() => {
        setStep(0)
      }}
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
  onImageSelected: (uri: string) => void
  loading: boolean
}

const ActivityCheckOutSelfie = ({ onImageSelected, loading }: ActivityCheckOutSelfieProps) => {
  const { t } = useTranslation()
  const [image, setImage] = useState<string | null>(null)

  const saveImage = async (dataUrl: string) => {
    const path = await saveProofOfAttendancePicture(dataUrl)
    onImageSelected(path)
    setImage(path)
  }

  const pickPhoto = async (pickerFunction: typeof ImagePicker.openPicker) => {
    try {
      const image = await pickerFunction({
        width: 1000,
        height: 1000,
        cropping: true,
        includeBase64: true,
        cropperChooseText: t('choose') ?? undefined,
        cropperCancelText: t('cancel') ?? undefined,
      })
      if (image) {
        // @ts-ignore
        const dataUrl = getDataURL(image.mime, image.data)
        await saveImage(dataUrl)
      }
    } catch (err) {
      const error = ensureError(err)
      const MISSING_PERMISSION_ERR_MSG = 'Required permission missing'
      const USER_CANCELLED_ERR_MSG = 'User cancelled image selection'
      if (
        error.message.includes(USER_CANCELLED_ERR_MSG) ||
        error.message.includes(MISSING_PERMISSION_ERR_MSG)
      ) {
        Logger.info('PictureInput', error.message)
        return
      }
      Logger.error('PictureInput', 'Error while fetching image from picker', error)
    }
  }

  const selectFromGallery = async () => {
    await pickPhoto(ImagePicker.openPicker)
  }

  const takePhoto = async () => {
    await pickPhoto(ImagePicker.openCamera)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectImageBox} onPress={selectFromGallery}>
        {!!image && <Image source={{ uri: image }} style={styles.image} />}
        {!image && (
          <Fragment>
            <ImageTree />
            <Text style={styles.selectImageText}>{t('checkOut.selectImage')}</Text>
          </Fragment>
        )}
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>{t('or')}</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
        <CameraIcon />
        <Text style={styles.cameraButtonText}>{t('checkOut.useCamera')}</Text>
      </TouchableOpacity>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.Regular16,
    backgroundColor: Colors.white,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  selectImageBox: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
    borderRadius: variables.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectImageText: {
    ...typeScale.labelMedium,
    color: Colors.gray4,
    marginTop: Spacing.Small12,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: Spacing.Thick24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray2,
  },
  dividerText: {
    ...typeScale.labelMedium,
    color: Colors.gray4,
    marginHorizontal: Spacing.Regular16,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.Small12,
    padding: Spacing.Regular16,
    borderWidth: 1,
    borderColor: Colors.gray2,
    borderRadius: variables.borderRadius,
    width: '100%',
  },
  cameraButtonText: {
    ...typeScale.labelLarge,
    color: Colors.black,
  },
})
