import * as yup from 'yup'
export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .max(40)
    .required('Name must be filled'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email must be filled'),
  password: yup
    .string()
    .min(6)
    .required('Password must be filled'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  phone: yup
    .string()
    .required('Phone number must be filled'),
  // address: yup
  //   .string()
  //   .required('Address must be filled'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Invalid gender')
    .required('Gender is required'),
})

export const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is invalid!'),
  password: yup.string().required('Password is required')
})

export const profileSchema = yup.object().shape({
  email: yup.string()
    .email('Email không hợp lệ')
    .required('Email là bắt buộc'),
  passwordConfirm: yup.string()
    .required('Điền mật khẩu để xác nhận thông tin thay đổi'),
  username: yup.string()
    .min(2, 'Tên đăng nhập phải chứa ít nhất 2 kí tự')
    .max(50, 'Tên đăng nhập không được quá 50 kí tự')
    .required('Tên đăng nhập là bắt buộc'),
  phone: yup.string()
    .matches(/^\d{10,11}$/, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại là bắt buộc'),
  address: yup.string().required('Địa chỉ là bắt buộc'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Invalid gender')
    .required('Giới tính là bắt buộc'),
});
