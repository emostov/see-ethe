# frozen_string_literal: true

@tags.each do |tag|
  json.set! tag.address do
    json.extract! tag, :address, :address_type, :name, :data, :id
  end
end
