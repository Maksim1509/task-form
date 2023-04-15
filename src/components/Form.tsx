import React, { FormEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import './Form.css';

export type FormData = {
  username: string;
  password: string;
  inputTextLabel: string;
  rememberMe: boolean;
  toggle: string;
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
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert(JSON.stringify(data));
  };
  const resetHandle = (e: FormEvent) => {
    e.preventDefault();
    reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Enter password"
        {...register('password', {
          required: 'Enter password',
        })}
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => <p className="form__error">{message}</p>}
      />
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
      <label>
        <input type="checkbox" {...register('rememberMe')} />
        Remember me
      </label>
      <input type="checkbox" id="toggle" {...register('toggle')} />
      <label htmlFor="toggle">off</label>
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
          checked
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
      <label className="form__label">
        Dropdown Title
        <select
          {...register('dropdownTitle', {
            validate: (value) => dropdownValidate(value) || 'Select option',
          })}
        >
          <option value="">Dropdown option</option>
          <option value="Dropdown option1">Dropdown option1</option>
          <option value="Dropdown option2">Dropdown option2</option>
        </select>
      </label>
      <ErrorMessage
        errors={errors}
        name="dropdownTitle"
        render={({ message }) => <p className="form__error">{message}</p>}
      />
      <div>
        <button type="reset" onClick={resetHandle}>
          Cancel
        </button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Form;
