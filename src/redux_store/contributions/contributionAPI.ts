import { ContributionFormFields } from '@/components/citizen/forms/ContributionsForm'
import { AppDispatch } from '@/redux_store'
import { ConnectToAPI } from '@/utils/utility'

export const addNewContribution =
  (contribution: ContributionFormFields) => async (dispatch: AppDispatch) => {
    try {
      const body = JSON.stringify({
        eventID: '0001',
        addInfo: {
          ...contribution,
          userId: 'be2763ebd37d3de2332e32e24ce2qe321',
        },
      })

      const res = await ConnectToAPI('contributions', body)

      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }
