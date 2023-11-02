import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  shopName: yup.string().required().oneOf(['Name 1', 'Name 2', 'Name 3', 'Name 4'], 'Shop Name must be accepted'),
  postalCodeBefore: yup.string().required(),
  postalCodeAfter: yup.string().required(),
  city: yup.string().required().oneOf(['Tokyo', 'Osaka', 'Kyoto', 'Nagoya', 'Fukuoka'], 'City must be accepted'),
  municipalities: yup.string().required(),
  address: yup.string().required(),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .required('Phone number is required'),
  status: yup.number().required().oneOf([1, 2], 'Status must be accepted'),
  shopId: yup.number().required().oneOf([1, 5, 75, 87], 'shopId must be accepted'),
});
export default schema;
