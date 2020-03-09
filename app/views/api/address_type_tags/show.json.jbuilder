# frozen_string_literal: true

  json.set! @tag.address do
    json.extract! @tag, :address, :address_type, :name, :data, :id
  end
