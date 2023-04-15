import React, { FormEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import './Form.css';

export type FormData = {
  username: string;
  password: string;
  inputTextLabel: string;
  rememberMe: boolean;
  toggle: boolean;
  checkbox: boolean;
  radioSelection: string;
  dropdownTitle: string;
};

const dropdownValidate = (value: string): boolean => !!value;

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      radioSelection: 'radioSelection2',
      toggle: false,
    },
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert(JSON.stringify(data));
  };
  const resetHandle = (e: FormEvent) => {
    e.preventDefault();
    reset();
  };
  console.log(getValues('toggle'));
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div
        className={
          errors.username ? 'form__field form__field_error' : 'form__field'
        }
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          {...register('username', {
            required: 'Enter username',
          })}
        />
        <ErrorMessage
          errors={errors}
          name="username"
          render={({ message }) => <p className="form__error">{message}</p>}
        />
      </div>
      <div
        className={
          errors.password ? 'form__field form__field_error' : 'form__field'
        }
      >
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          {...register('password', {
            required: 'Enter password',
            validate: (value) =>
              (value.length > 3 && value.length < 12) ||
              'Password must be between 4 and 12 characters',
          })}
        />
        {!errors.password && (
          <p className="form__assist">
            Your password is between 4 and 12 characters
          </p>
        )}
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p className="form__error">{message}</p>}
        />
      </div>
      <div
        className={
          errors.username ? 'form__field form__field_error' : 'form__field'
        }
      >
        <label htmlFor="inputTextLabel">Input Text Label</label>
        <input
          type="text"
          id="inputTextLabel"
          placeholder="Input Text"
          {...register('inputTextLabel', {
            required: 'Error message informing me of a problem',
          })}
        />
        <ErrorMessage
          errors={errors}
          name="inputTextLabel"
          render={({ message }) => <p className="form__error">{message}</p>}
        />
      </div>

      <label>
        <input type="checkbox" {...register('rememberMe')} />
        Remember me
      </label>
      <div className="form__toggle">
        <input type="checkbox" id="toggle" {...register('toggle')} />
        <label htmlFor="toggle">on / off</label>
      </div>
      <div className="form__radio">
        <label>
          <input
            type="radio"
            value="radioSelection1"
            {...register('radioSelection')}
          />
          Radio selection 1
        </label>
        <label>
          <input
            type="radio"
            value="radioSelection2"
            {...register('radioSelection')}
          />
          Radio selection 2
        </label>
        <label>
          <input
            type="radio"
            value="radioSelection3"
            {...register('radioSelection')}
          />
          Radio selection 3
        </label>
      </div>
      <div className="form__dropdown">
        <label htmlFor="dropdown">Dropdown Title</label>
        <select
          id="dropdown"
          {...register('dropdownTitle', {
            validate: (value) => dropdownValidate(value) || 'Select option',
          })}
        >
          <option value="">Dropdown option</option>
          <option value="Dropdown option1">Dropdown option1</option>
          <option value="Dropdown option2">Dropdown option2</option>
        </select>

        <ErrorMessage
          errors={errors}
          name="dropdownTitle"
          render={({ message }) => <p className="form__error">{message}</p>}
        />
      </div>

      <div className="form__btns">
        <button className="btn" type="reset" onClick={resetHandle}>
          Cancel
        </button>
        <button className="btn btn_filled" type="submit">
          Next
        </button>
      </div>
    </form>
  );
};

export default Form;
