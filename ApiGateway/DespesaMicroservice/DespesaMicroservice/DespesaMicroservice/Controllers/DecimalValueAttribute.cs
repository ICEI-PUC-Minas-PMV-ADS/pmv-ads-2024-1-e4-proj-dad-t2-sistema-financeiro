using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace DespesaMicroservice.Controllers
{
    public class DecimalValueAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
            {
                return new ValidationResult("O campo Valor é obrigatório.");
            }

            if (value is decimal decimalValue)
            {
                // Verifica se o valor é um número decimal válido
                if (decimalValue < 0)
                {
                    return new ValidationResult("O campo Valor deve ser um número positivo.");
                }

                // Verifica se o valor tem no máximo duas casas decimais
                var decimalString = decimalValue.ToString(CultureInfo.InvariantCulture);
                if (decimalString.Contains(".") && decimalString.Split('.')[1].Length > 2)
                {
                    return new ValidationResult("O campo Valor deve ter no máximo duas casas decimais.");
                }

                return ValidationResult.Success;
            }

            return new ValidationResult("O campo Valor deve ser um número decimal.");
        }
    }
}