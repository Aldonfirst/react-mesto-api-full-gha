import { useState, useCallback } from "react";
function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  
  const handleChange = useCallback((evt) => {
    const { target } = evt;
    const { name, value } = target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: target.validationMessage }));
    setIsValid(target.closest("form").checkValidity());
  }, []);

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, []);

  return { values, handleChange, errors, isValid, resetForm };
}

export default useFormWithValidation;
