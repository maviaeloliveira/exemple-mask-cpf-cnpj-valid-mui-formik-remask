import { useState } from 'react'
import * as Yup from 'yup';
import { Formik } from 'formik';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import { TextFieldWithMask } from './components/TextFieldWithMask';
import {Button, CircularProgress} from '@mui/material';


export function App() {

  return (
    <>
      <Formik
        initialValues={{
          cpfcnpj: ''
        }}
        validationSchema={Yup.object().shape({
          cpfcnpj: Yup.string()
            .matches(/^[0-9]+$/, "Deve ser apenas dígitos")
            .min(11, "Mínimo 11 dígitos")
            .max(14, "Máximo 14 dígitos")
            .notRequired()
            .test(
              'cpf-cnpj-valido',
              'CPF/CNPJ não é valido',
              function (value: string) {
                let valor: string = value || ''

                if (valor.length > 11)
                  return cnpjValidator.isValid(valor)
                else
                  return cpfValidator.isValid(valor)
              }
            )
        })}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <TextFieldWithMask
              sx={{
                mr: 2
              }}
              label="CPF/CNPJ"
              mask={["999.999.999-99", "99.999.999/9999-99"]}
              error={Boolean(touched.cpfcnpj && errors.cpfcnpj)}
              helperText={touched.cpfcnpj && errors.cpfcnpj}
              fullWidth
              name="cpfcnpj"
              placeholder='CPF/CNPJ...'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.cpfcnpj}
              variant="outlined"
              inputProps={{ maxLength: 18 }}
            />

            <Button
              sx={{
                mt: { xs: 2, sm: 0 }
              }}
              type="submit"
              startIcon={
                isSubmitting ? <CircularProgress size="2rem" /> : null
              }
              // disabled={Boolean(errors.submit) || isSubmitting}
              variant="contained"
              size="medium"
            >
              Validar
            </Button>
          </form>
        )}


      </Formik>
    </>
  )
}