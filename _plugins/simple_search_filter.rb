module Jekyll
  module CharFilter
    def remove_chars(input)
      input.gsub! '\\','&#92;'
      input.gsub! /\t/, '    '
      input.strip_control_and_extended_characters
    end
  end
end
